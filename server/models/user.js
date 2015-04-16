'use strict';
var bcrypt = require('bcrypt-nodejs');

var UserModel = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isLowercase: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    // Reset token
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.post);
        User.hasMany(models.file);
        User.belongsTo(models.city);
      }
    },
    instanceMethods: {
      comparePassword: function(candidatePassword, done) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if (err) {
            return done(err);
          }
          done(null, isMatch);
        });
      }
    }
  });

  // Run before validating any data
  User.hook('beforeValidate', function(user, done) {

    // Check to see if password has changed
    if (!user.changed('password')) {
      return done(null, user);
    }

    // Salt and Hash password
    bcrypt.genSalt(5, function(err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return done(err);
        }
        user.password = hash;
        return done(null, user);
      });
    });
  });

  return User;
};

module.exports = UserModel;
