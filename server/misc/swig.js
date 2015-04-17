'use strict';
var swig = require('swig');
var linkify = require('html-linkify');
swig.setDefaults({ autoescape:false });

swig.setFilter('textToHTML', function (text) {
  text = text + '<h1>asddas</h1>'; 
  if (text) {
    text = linkify(text);
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
  return text;
});
