'use strict';
$(function() {
  var Cookies = window.Cookies || Cookies;

  window.setGeoLocation = function (geo) {
    if (typeof geo === 'object') {
      for (var index in geo) {
        if (geo.hasOwnProperty(index)) {
          Cookies.set(index, geo[index], {expires: Infinity});
        }
      }
    } else {
      alert('An error has occured. Try again.');
    }
  };

  window.findGeoLocation = function () {
    if (navigator.geolocation) {
      window.openLoadingModal('Please share you location with us so we can show you relevant posts.');

      navigator.geolocation.getCurrentPosition(function (data) {    
        window.setGeoLocation({
          lat:data.coords.latitude,
          lng: data.coords.longitude
        });

        window.closeLoadingModal();

        document.location.reload();
      }, function (error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            window.openMessageModal('Access to location API denied by you.', 'error');
            break;
          case error.POSITION_UNAVAILABLE:
            window.openMessageModal('Unable to determine location.', 'error');
            break;
          case error.TIMEOUT:
            window.openMessageModal('Unable to determine location, the request timed out.', 'error');
            break;
          case error.UNKNOWN_ERROR:
            window.openMessageModal('An unknown error occurred!', 'error');
            break;
        }
      });
    } else {
      window.openMessageModal('Geolocation is not supported by this browser, please upgrade to a more recent version.');
    }
  };

  window.updateLocation = function () {
    Cookies.expire('lat');
    Cookies.expire('lng');
    Cookies.expire('city');
    Cookies.expire('country');
    Cookies.expire('continent');
    Cookies.expire('timezone');

    window.findGeoLocation();
  };

  if (!Cookies.get('lat') && !Cookies.get('lng')) {
    window.findGeoLocation();
  }
});