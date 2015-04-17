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
  var created = moment(item.createdAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow(),
      updated = moment(item.updatedAt,'dddd, MMMM Do YYYY, h:mm:ss').fromNow();

  if (created && updated) {
    if (created === updated) {
      return '<span>' + created + '</span>';
    } else {
      return '<span title="Updated ' + updated + '">' + created + ' *</span>';
    }
  } else if (created) {
    return '<span>' + created + '</span>';
  }

  return;
});
