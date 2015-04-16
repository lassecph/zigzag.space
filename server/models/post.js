'use strict';

var PostModel = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    text: {
      type: DataTypes.TEXT,
    },
    up: {
      type: DataTypes.INTEGER.UNASSIGNED
    },
    down: {
      type: DataTypes.INTEGER.UNASSIGNED
    },
    hotness: {
      type: DataTypes.INTEGER.UNASSIGNED
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.user);
        Post.belongsTo(models.city);
        Post.hasMany(models.comment);
        Post.hasMany(models.file);
      }
    }
    // instanceMethods: {}
  });
  return Post;
};

module.exports = PostModel;