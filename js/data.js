'use strict';

(function () {
  var getMapPin = function (i) {
    var LOCATION_X_MIN = 0;
    var LOCATION_X_MAX = 1200;
    var LOCATION_Y_MIN = 130;
    var LOCATION_Y_MAX = 630;
    var TYPES = ['palace', 'flat', 'house ', 'bungalo'];

    var getRandomValueFrom = function (array) {
      return array[Math.round(Math.random() * (array.length - 1))];
    };

    var getRandomNumber = function (min, max) {
      var randomNumber = Math.random() * (max - min) + min;
      return randomNumber;
    };

    var mapPin = {
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png'
      },
      offer: {
        type: getRandomValueFrom(TYPES)
      },
      location: {
        x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
        y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
    return mapPin;
  };

  window.getMapPins = function () {
    var mapPins = [];
    for (var i = 0; i < 8; i++) {
      mapPins.push(getMapPin(i + 1));
    }
    return mapPins;
  };
})();
