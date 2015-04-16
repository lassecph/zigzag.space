/**
 * Main Controller
 */

'use strict';

var db = require('../config/database');
var User = db.user;

/**
 * POST /user
 * Create a new local account.
 * @param email
 * @param password
 * @param confirmPassword
 */

var createAccount = function(req, res, next) {
  req.assert('username', 'Username must be between 2 - 50 characters long').len(2, 50);
  req.assert('username', 'Username can only contain the following characters: A-Z, a-z, 0-9, _-').matches(/^[a-z0-9 _-]+$/i);
  req.assert('password', 'Password must be at least 6 characters long').len(3);

  var err = req.validationErrors();
  if (err) {
    if (req.xhr) {
      return res.json(errors, 500);
    } else {
      req.flash('errors', errors);
      return res.redirect('/signup');
    }
  }

  var user = {
    username: req.body.username,
    password: req.body.password,
    lat: req.cookies.lat,
    lng: req.cookies.lng,
    cityId: req.cookies.cityId
  };

  User.find({
    where: {
      username: req.body.username
    }
  }).success(function(existingUser) {
    if (existingUser) {
      if (req.xhr) {
        return res.json([{msg: 'That username already exists. Try another.'}], 500);
      } else {
        req.flash('errors', {
          msg: 'That username already exists. Try another.'
        });

        res.redirect('/signup');
      }
    }
    User.create(user).success(function(user) {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        req.flash('success', {
          msg: 'Account created successfully.'
        });
        res.redirect('/');
      });
    }).error(function(err) {
      if (err) {
        return next(err);
      }
    });
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

/**
 * PUT /user
 * Update profile information.
 */

var updateProfile = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();

  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/settings');
  }

  db.User.find(req.user.id).success(function(user) {
    user.email = req.body.email || '';
    user.firstName = req.body.firstName || '';
    user.lastName = req.body.lastName || '';

    db.user.save().success(function() {
      req.flash('success', {
        msg: 'Profile information updated.'
      });
      res.redirect('/settings');
    }).error(function(err) {
      if (err) {
        return next(err);
      }
    });
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

/**
 * PUT /user/password
 * Update current password.
 * @param password
 * @param confirmPassword
 */

var updatePassword = function(req, res, next) {
  req.assert('password', 'Password must be at least 6 characters long').len(6);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/settings');
  }

  User.find(req.user.id).success(function(user) {
    user.password = req.body.password;

    user.save().success(function() {
      req.flash('success', {
        msg: 'Password has been changed.'
      });
      res.redirect('/settings');
    }).error(function(err) {
      if (err) {
        return next(err);
      }
    });
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

/**
 * DELETE /user
 * Delete current user account.
 */

var deleteAccount = function(req, res, next) {
  User.destroy(req.user.id).success(function() {
    req.logout();
    req.flash('info', {
      msg: 'Your account has been deleted.'
    });
    res.redirect('/');
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  createAccount: createAccount,
  updateProfile: updateProfile,
  updatePassword: updatePassword,
  deleteAccount: deleteAccount
};
