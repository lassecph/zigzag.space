'use strict';

var PostModel = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    text: {
      type: DataTypes.TEXT,
    },
    up: {
      type: DataTypes.INTEGER.UNSIGNED,
      default: 0
    },
    down: {
      type: DataTypes.INTEGER.UNSIGNED,
      default: 0
    },
    hotness: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    // city: {
    //   type: DataTypes.STRING,
    // },
    // country: {
    //   type: DataTypes.STRING,
    // },
    lat: {
      type: DataTypes.FLOAT(9,6),
    },
    lng: {
      type: DataTypes.FLOAT(9,6),
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.user);
        Post.belongsTo(models.city);
        Post.hasMany(models.comment);
        Post.hasMany(models.file);
        Post.hasMany(models.like);
      }
    }
    // instanceMethods: {}
  });
  return Post;
};

module.exports = PostModel;