'use strict';
$(function() {
  // Main comment form
  $('div#comments form.main-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      data: $(this).serializeArray(),
      success: function (data) {
        $('div#comments-roll').prepend(data);
      },
      error: function (err) {
      },
      complete: function () {}
    });
  });

  window.replyComment = function (self) {
    console.log(self);

    $.ajax({
      url: '/c',
      type: 'post',
      data: {
        _csrf: $('meta[name=csrf-token]').attr('content'),
        postId: self.attr('data-postid'),
        parentId: self.attr('data-parentid'),
        text: self.prev('textarea').val()
      },
      success: function (data) {
        console.log(data);
        // $('div#comments-roll').prepend(data);
      },
      error: function (err) {
      },
      complete: function () {}
    });
  };

  // Reply form
  $('a.comment-reply-link').click(function(e) {
    e.preventDefault();
    var replyForm = 
    '<div class="reply-form">' +
      '<textarea></textarea>' +
      '<input type="submit" value="Add comment" data-postid="' + $(this).attr('data-postid') + '" data-parentid="' + $(this).attr('data-parentid') + '">' +
    '</div>';

    if ($(this).text().toLowerCase() === 'reply') {
      $(this).text('Close').after(replyForm);
      $(this).next('div').find('input[type=submit]').click(function(e) {
        e.preventDefault();
        window.replyComment($(this));
      });
    } else {
      $(this).text('Reply').next('div.reply-form').remove();
    }
  });



});