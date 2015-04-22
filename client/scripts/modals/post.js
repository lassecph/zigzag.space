'use strict';
$(function() {
  var defaults = {
    top: 100,
    overlayOpacity: 0.3,
    overlayColor: '#333',
    overlayClose: true,
    closeOnEscape: true,
    transitionIn: 'animated bounceInDown',
    transitionOut: 'animated bounceOutUp',
  };

  window.openPostModal = function (message ) {
    if (!message) {
      message = 'We are currently loading stuff for you...';
    }

    var modal = $('#create-post');

    modal.find('#message').html(message);

    modal.trigger('openModal');
  };

  window.closePostModal = function () {
    $('#create-post').trigger('closeModal');
  };

  $('div#create-post').easyModal(defaults);

  $('a.create-post-link').click(function(e) {
    e.preventDefault();

    if ($('div#create-post').css('display') === 'none') {
      window.openPostModal();
    } else {
      window.closePostModal();
    }
  });

  $('div#create-post form.create').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      data: $(this).serializeArray(),
      success: function (data) {
        window.location.href = '/p/' + data.id;
      },
      error: function (err) {
      },
      complete: function () {}
    });
  });
});
