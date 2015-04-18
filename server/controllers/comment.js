'use strict';

var db = require('../config/database'),
    _ = require('lodash'),
    Comment = db.comment;

var createComment = function (req, res, next) {
  req.assert('text', 'You must write some text.').notEmpty();
  req.assert('postId', 'Missing some data. Try again.').notEmpty();

  var errors = req.validationErrors();
  if (errors) return res.json(errors, 500);

  if (!req.user) return res.json([{msg: 'You must be logged in to add a post.'}], 500);

  var comment = {
    postId: req.body.postId,
    parentId: req.body.parentId,
    userId: req.user.id,
    up: 0,
    down: 0,
    hotness: 0,
    text: req.body.text,
  };

  Comment.create(comment).then(function(comment) {
    comment = _.assign(comment.dataValues, req.user);

    return res.render(['post/comment'], {comments:[comment]});
  }, function (err) { 
    return res.json([{msg: 'An error occured.'}], 500);
  });
};

var updateComment = function (req, res, next) {
  return res.json('index');
};

var deleteComment = function (req, res, next) {
  return res.json('index');
};

module.exports = {
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};
