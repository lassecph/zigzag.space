'use strict';
$(function() {
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
});