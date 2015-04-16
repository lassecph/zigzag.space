'use strict';
var CommentModel = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
    },
    up: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    down: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    hotness: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    timestamps: true,
    hierarchy: true,
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.user);
        Comment.belongsTo(models.post);
        Comment.hasMany(models.like);
      }
    },
    // instanceMethods: {},
  });
  return Comment;
};

module.exports = CommentModel;