'use strict';
$(function() {
  // User dropdown
  $('a#header-userdropdown-link').click(function(e) {
    e.preventDefault();
    var dropdown = $('div#header-userdropdown');

    if (dropdown.css('display') !== 'none') {
      dropdown.addClass('slideInDown');
      dropdown.removeClass('slideInUp');
    } else {
      dropdown.addClass('slideInUp');
      dropdown.removeClass('slideInDown');
    }

    dropdown.toggle();
  });
});