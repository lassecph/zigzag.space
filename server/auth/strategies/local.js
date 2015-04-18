'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy;

var strategy = function (User) {
  passport.use(new LocalStrategy({
    usernameField: 'username'
  }, function(username, password, done) {
    User.find({
      where: {
        username: username
      }
    }).success(function(user) {
      if (!user) {
        return done(null, false, {
          message: 'Invalid username or password.'
        });
      }
      user.comparePassword(password, function(err, isMatch) {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid username or password.'
          });
        }
      });
    }).error(function(err) {
      if (err) {
        return done(err);
      }
    });
  }));
};

module.exports = strategy;
