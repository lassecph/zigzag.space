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

  window.openLoadingModal = function (message ) {
    if (typeof message === 'undefined') {
      message = 'We are currently loading stuff for you...';
    }

    var modal = $('#loading-modal');

    modal.find('#message').html(message);

    modal.trigger('openModal');
  };

  window.closeLoadingModal = function () {
    $('#loading-modal').trigger('closeModal');
  };

  $('#loading-modal').easyModal(defaults);

});