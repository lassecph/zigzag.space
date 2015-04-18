'use strict';

var db = require('../config/database'),
    _ = require('lodash'),
    Post = db.post,
    User = db.user,
    File = db.file,
    City = db.city,
    Comment = db.comment;


var createPost = function (req, res, next) {
  if (!req.body.image && !req.body.text) {
    req.assert('text', 'You must provide some text or an image.').len(10);
    
    var errors = req.validationErrors();
    if (errors ) {
      return res.json(errors, 500);
    }
  }

  if (!req.user) {
    return res.json([{msg: 'You must be logged in to add a post.'}], 500);
  }

  if (!res.locals.geo) {
    return res.json([{msg: 'You must be located before adding posts. Share location from the address bar.'}], 500);
  }

  var post = {
    text: req.body.text,
    image: req.body.image,
    commentCount: 0,
    username: res.locals.user.username,
    cityId: res.locals.user.cityId,
    userId: res.locals.user.id,
    lat: parseFloat(res.locals.geo.lat),
    lng: parseFloat(res.locals.geo.lng)
  };

  Post.create(post).then(function (post) {
    req.flash('success', {
      msg: 'Post created successfully.'
    });

    return res.json(post);
  });
}

var readPost = function (req, res, next) {
  Post.find({ where: {id: req.params.id}, include: [User, File, City] }).then(function(post) {
    var titel = _.escape(post.text.replace(/(?:\r\n|\r|\n)/g, '')); // Remove break lines and escape

    Comment.findAll({ 
      where: { postId: req.params.id }, 
      hierarchy: true, 
      include: {model: User, as: 'user'},
      order: 'hotness DESC'
    }).then(function(comments) {
      return res.render(['post/read'], {
        titel: _.trunc(titel, 50) + ' | ' + post.city.city + ' | ' + post.city.country,
        post: post,
        comments: comments
      });
    });
    // 
    // Comment.findAll({ where: { postId: req.params.id }, hierarchy: false }).then(function(comments) {
    //   // console.log(comments);
    //   return res.render(['post/read'], {
    //     titel: _.trunc(titel, 50) + ' | ' + post.city.city + ' | ' + post.city.country,
    //     post: post,
    //     comments: comments
    //   });
    // });

    // Comment.findAll({ 
    //   where: { postId: req.params.id },
    //   // include: [{model: Comment, as: 'descendents', hierarchy: true}, {model: User, as: 'user'}]
    //   // include: {model: Comment, as: 'descendents', hierarchy: true},
    //   include: [{model: Comment, as: 'children'}, {model: User, as: 'user'}],
    //   order: [ [ { model: Comment, as: 'children' }, 'hierarchyLevel' ] ]
    // }).then(function (comments) {
    //   console.log(comments);
    //   if (post.deleteAt) {
    //     return res.render(['post/deleted'], {
    //       titel: 'Post deleted',
    //       post: post
    //     });
    //   }

    //   return res.render(['post/read'], {
    //     titel: _.trunc(titel, 50) + ' | ' + post.city.city + ' | ' + post.city.country,
    //     post: post,
    //     comments: comments
    //   });
    // });
  });
}

var updatePost = function (req, res, next) {
  next();
}

var deletePost = function(req, res, next) {
}

var postUpload = function (req, res, next) {
}


module.exports = {
  createPost: createPost,
  readPost: readPost,
  updatePost: updatePost,
  deletePost: deletePost,
  postUpload: postUpload,
};
