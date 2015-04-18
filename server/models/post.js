'use strict';

var PostModel = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    text: {
      type: DataTypes.TEXT,
    },
    commentCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      default: 0
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
    postCity: {
      type: DataTypes.STRING,
    },
    postCountry: {
      type: DataTypes.STRING,
    },
    postLat: {
      type: DataTypes.FLOAT(9,6),
    },
    postLng: {
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