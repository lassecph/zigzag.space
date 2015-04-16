/**
 * Express configuration
 */
'use strict';

var sequelize = require('sequelize');
var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var passport = require('passport');
var auth = require('../auth');
var session = require('express-session'),
    MemcachedStore = require('connect-memcached')(session);


// Configuration files
var secrets = require('./secrets');
var settings = require('./env/default');
var security = require('./security');

var expressConfig = function(app, express, db) {

  var hour = 3600000;
  var day = hour * 24;
  var week = day * 7;

  // Get current server environment
  var env = app.get('env');

  // Remove x-powered-by header (doesn't let clients know we are using Express)
  app.disable('x-powered-by');

  // Setup port for server to run on
  app.set('port', settings.server.port);

   // Setup view engine for server side templating
  app.engine('swig', require('swig').renderFile);
  app.set('view engine', 'swig');

  // Setup path where all server templates will reside
  app.set('views', path.join(settings.root, 'server/templates'));

  // Enable GZip compression for all static assets
  app.use(compress());

  if (env === 'development') {
    // Include livereload script on all pages
    app.use(require('connect-livereload')());
    // Load bower_components
    app.use(express.static(path.join(settings.root, '.tmp'), {maxAge: 0}));
    app.use('/bower_components', express.static(path.join(settings.root, 'client/bower_components'), {maxAge: 0}));
  }
  // Load favicon
  app.use(favicon(path.join(settings.root, settings.staticAssets, '/favicon.ico')));
  // Load static assets
  app.use(express.static(path.join(settings.root, settings.staticAssets), {maxAge: week}));

  // Returns middleware that parses both json and urlencoded.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Returns middleware that parses cookies
  app.use(cookieParser());

  // Initialize form validation
  app.use(expressValidator());

  /**
   * Enable HTTP Method Overrides (POST, GET, DELETE, PUT, etc)
   * Override HTML forms with method="POST" using ?_method=PUT at the end of action URLs
   * ex <form method="POST" action="/someurl?_method=PUT">
   */
  app.use(methodOverride('_method'));

  // override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

  /**
   * Create cookie that keeps track of user sessions
   */
  app.use(session({
    secret: secrets.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true, // Only server can manipulate cookies
      maxAge: 2419200000
    },
    store: new MemcachedStore({
      hosts:['127.0.0.1:11211']
    })
  }));

  // Initialize Authentication
  auth.init(db.user);
  app.use(passport.initialize());
  app.use(passport.session());

  // Initialize server validation flash messages
  app.use(flash());

  // Initialize Security
  app.use(security);

  app.use(function(req, res, next) {
    // Make Node environment available in templates
    res.locals.env = env;
    // Make user object available in templates.
    res.locals.user = req.user;

    res.locals.geo = {};

    if (typeof req.cookies.lat === 'undefined') {
      res.locals.geo = null;
      next(); // No geo
    } else if (typeof req.cookies.city === 'undefined') {
      db.sequelize.query('SELECT *, ( 3959 * acos( cos( radians(:lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(:lng) ) + sin( radians(:lat) ) * sin( radians( lat ) ) ) ) AS distance FROM cities HAVING distance < 25 ORDER BY distance LIMIT 1;', 
        { replacements: { lat: req.cookies.lat, lng: req.cookies.lng, distance: 60}, type: sequelize.QueryTypes.SELECT }
      ).then(function(data) {
        data = data[0];
        
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (key === 'id') {
              res.locals.geo['cityId'] = data[key];
              res.cookie('cityId', data[key], {maxAge: 2419200000, httpOnly: false});
            } else {
              res.locals.geo[key] = data[key];
              res.cookie(key, data[key], {maxAge: 2419200000, httpOnly: false});
            }
          }
        }

        next();
      });
    } else {
      var data = req.cookies;

      for (var key in data) {
        if (data.hasOwnProperty(key) && key !== 'id') {
          res.locals.geo[key] = data[key];
        }
      }

      next();
    }
  });

  /**
   * Remember original destination before login.
   * Go back to that original destination once successfully logged in
   * (Unless specified in the ignoredPaths array)
   */
  app.use(function(req, res, next) {
    var path = req.path.split('/')[1];
    var regExp = new RegExp(settings.server.loginIgnorePaths.join('|'), 'i');
    if (regExp.test(path)) {
      return next();
    }
    req.session.returnTo = req.path;
    next();
  });

  // Setup log level for server console output
  app.use(logger(settings.server.logLevel));

  if (env === 'development') {

    // Disable caching for easier testing
    app.use(function noCache(req, res, next) {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.header('Pragma', 'no-cache');
      res.header('Expires', 0);
      next();
    });
  }

  // Load routes
  require(path.join(settings.root,'./server/routes'))(app);

  // 404 Error Handler
  app.use(function(req, res) {
    res.status(404);
    res.format({
      html: function() {
        res.render('error', {
          status: 404,
          message: 'Page not found',
          error: {}
        });
      },
      json: function() {
        res.json({
          status: 404,
          message: 'Page not found',
          error: {}
        });
      },
      text: function() {
        res.send(404 + ': ' + 'Page not found');
      }
    });
  });

  if (env === 'development') {
    // Development Error Handler.
    // Log out stack trace
    return app.use(errorHandler());
  }

  // Production Error Handler.
  app.use(function(err, req, res, next) {

    var error = err.error || err;
    var message = err.message;
    var status = err.status || 500;

    res.status(status);
    res.format({
      html: function() {
        res.render('error', {
          status: status,
          message: message,
          error: {}
        });
      },
      json: function() {
        res.json({
          status: status,
          message: message,
          error: {}
        });
      },
      text: function() {
        res.send(status + ': ' + message);
      }
    });
  });


};

module.exports = expressConfig;
