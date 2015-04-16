'use strict';
var CityModel = function(sequelize, DataTypes) {
  var City = sequelize.define('city', {
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    continent: {
      type: DataTypes.STRING,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT(9,6),
    },
    lng: {
      type: DataTypes.FLOAT(9,6),
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        City.hasMany(models.user);
        City.hasMany(models.post);
      }
    },
    // instanceMethods: {},
  });
  return City;
};

module.exports = CityModel;