/**
 * Auth Routes
 */

'use strict';

var postController = require('../controllers/post');
var auth = require('../auth');

var routes = function(app) {
  app.get('/p/:id', postController.readPost);
  app.post('/p', postController.createPost);
  app.put('/p', postController.updatePost);
  app.delete('/p', postController.deletePost);
};

module.exports = routes;
