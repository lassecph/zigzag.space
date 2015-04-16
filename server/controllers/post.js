'use strict';
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

  // var post = new Post({
  //   text: req.body.text,
  //   image: req.body.image,
  //   username: res.locals.user.username,
  //   city: res.locals.geo.city,
  //   country: res.locals.geo.country,
  //   continent: res.locals.geo.continet,
  //   lnglat: [parseFloat(res.locals.geo.lng), parseFloat(res.locals.geo.lat)]
  // });

  // post.save(function (err, post) {
  //   if (err) { next(err); }

  //   req.flash('success', {
  //     msg: 'Post created successfully.'
  //   });

  //   return res.json(post);
  // });
}

var readPost = function (req, res, next) {
}

var updatePost = function (req, res, next) {
  
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
