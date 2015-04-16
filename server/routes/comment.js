'use strict';

var commentController = require('../controllers/comment');
var auth = require('../auth');

var routes = function(app) {
  app.get('/comment', commentController.createComment); // Testing
  app.post('/comment', commentController.createComment);
  app.put('/comment', commentController.updateComment);
  app.delete('/comment', commentController.deleteComment);
};

module.exports = routes;
