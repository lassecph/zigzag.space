'use strict';
var CommentModel = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
    }
  }, {
    timestamps: true,
    hierarchy: true,
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.user);
        Comment.belongsTo(models.post);
      }
    },
    // instanceMethods: {},
  });
  return Comment;
};

module.exports = CommentModel;