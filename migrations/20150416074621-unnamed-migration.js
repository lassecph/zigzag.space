"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addIndex('cities', 'lat');
    migration.addIndex('cities', 'lng');
    migration.addIndex('posts', 'updateAt');
    migration.addIndex('posts', 'hotness');
    migration.addIndex('user', 'username');
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
