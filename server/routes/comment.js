'use strict';

var commentController = require('../controllers/comment');
var auth = require('../auth');

var routes = function(app) {
  app.get('/c', commentController.createComment); // Testing
  app.post('/c', commentController.createComment);
  app.put('/c', commentController.updateComment);
  app.delete('/c', commentController.deleteComment);
};

module.exports = routes;
