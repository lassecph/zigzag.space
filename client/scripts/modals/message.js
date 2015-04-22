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

  window.openMessageModal = function (message, type) {
    var modal = $('#message-modal');

    if (type === 'error') {
      if (!message) {
        message = 'Ups, an error has occurred. Try again.';
      }

      modal.addClass('error');
      modal.addClass('success');

    } else {
      if (!message) {
        message = 'Some good just happend. Move along.';
      }

      modal.addClass('success');
      modal.addClass('error');
    }

    modal.find('#message').html(message);

    modal.trigger('openModal');
  };

  window.closeMessageModal = function () {
    $('#message-modal').trigger('closeModal');
  };

  $('#message-modal').easyModal(defaults);
});