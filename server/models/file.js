'use strict';
var FileModel = function(sequelize, DataTypes) {
  var File = sequelize.define('file', {
    filename: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        File.belongsTo(models.user);
        File.belongsTo(models.post);
      }
    }
    // instanceMethods: {}
  });
  return File;
};

module.exports = FileModel;