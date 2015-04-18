'use strict';
var swig = require('swig'),
    linkify = require('html-linkify'),
    moment = require('moment');

swig.setDefaults({ autoescape:false });

swig.setFilter('textToHTML', function (text) {
  if (text) {
    text = linkify(text);
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
  return text;
});

swig.setFilter('timeAgo', function (item) {
  // var created = moment(item.createdAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow(),
  //     updated = moment(item.updatedAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow();

  // if (created && updated) {
  //   if (created === updated) {
  //     return '<span>' + created + '</span>';
  //   } else {
  //     return '<span title="Updated ' + updated + '">' + created + ' *</span>';
  //   }
  // } else if (created) {
  //   return '<span>' + created + '</span>';
  // }

  return moment(item.createdAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow();
});

// Parse comment loop
function markupComment(comment) {
  var text = linkify(comment.text);
      text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');

  var markup = '\
    <div id="comment-' + comment.id + '" class="comment"> \
      <div class="comment-likes"></div> \
      <div class="comment-header"> \
        <span class="post-timeago">' + moment(comment.createdAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow() + '</span> - \
        <a href="/u/' + comment.user.username + '" title="View ' + comment.user.username + '" class="comment-user">' + comment.user.username +'</a> - \
        <a href="#comment-' + comment.id + '" title="Permalink to comment">link</a>\
      </div> \
      <p>' + text + '</p> \
      <div class="comment-reply"> \
        <a href="/c" class="comment-reply-link" title="Leave a reply" data-parentId="' + comment.id + '" data-postId="' + comment.postId + '">Reply</a>\
      </div>\
    </div>\
  ';

  return markup;
}

swig.setFilter('renderComment', function (comments) {
  var markup = '';

  var commentTree = function (comments) {
    markup += '<div class="comment-child">';

    for (var i = 0; i < comments.length; i++) {
      markup += markupComment(comments[i]);

      if (comments[i].children) {
        commentTree(comments[i].children);
      }
    }

    markup += '</div>';    
    
    return markup;
  }


  var markup = commentTree(comments);

  return markup;
});