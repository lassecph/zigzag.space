'use strict';
var createComment = function (req, res, next) {
  req.assert('text', 'You must write some text.').notEmpty();
  req.assert('postId', 'Missing some data. Try again.').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json(errors, 500);
  }

  if (!req.user) {
    return res.json([{msg: 'You must be logged in to add a post.'}], 500);
  }

  if (!res.locals.geo) {
    return res.json([{msg: 'You must be located before adding posts. Share location from the address bar.'}], 500);
  }

  // var comment = new Comment({
  //   postId: req.body.postId,
  //   parentId: req.body.parentId,
  //   up: 0,
  //   down: 0,
  //   hotness: 0,
  //   path: _.random(9999, 99999),
  //   text: req.body.text,
  //   user: {
  //     id: res.locals.user.id,
  //     username: res.locals.user.username
  //   },
  // });
  
  // if (req.body.parentPath) {
  //   comment.path = req.body.parentPath;
  // } else {
  //   comment.path = comment.id;
  // }
  return res.json('index');
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
