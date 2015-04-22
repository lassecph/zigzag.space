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

  window.errorAuthModal = function (error) {

  };

  window.openAuthModal = function () {
    var modal = $('#auth-modal');
    modal.trigger('openModal');
  };

  window.closeAuthModal = function () {
    $('#create-post').trigger('closeModal');
  };

  $('#auth-modal').easyModal(defaults); // Init

  $('a#auth-modal-link').click(function(e) {
    e.preventDefault();
    var modal = $('div#auth-modal');

    if (modal.css('display') === 'none') {
      window.openAuthModal();
    } else {
      window.closeAuthModal();
    }
  });

  // Move between form tabs
  $('div#auth-modal a').click(function(e) {
    e.preventDefault();
    $('div#auth-modal .animated').hide().removeClass('fadeIn');
    $('div#auth-modal .' + $(this).attr('data-form')).show().addClass('fadeIn');
  });

  $('div#auth-modal form.signup').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      data: $(this).serializeArray(),
      success: function () {
        document.location.reload();
      },
      error: function (errors) {
      },
      complete: function () {}
    });
  });

  $('div#auth-modal form.login').submit(function(e) {
    e.preventDefault();
  });

  // $('div#auth-modal form.login').submit(function(e) {
  //   e.preventDefault();
  // });
});