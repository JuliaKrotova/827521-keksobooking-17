'use strict';

var TYPES = ['palace', 'flat', 'house ', 'bungalo'];
var MAP_PIN_COUNT = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
};

var getMapPin = function (i) {
  var mapPin = {
    author: {
      avatar: 'img/avatars/user' + '0' + i + '.png'
    },
    offer: {
      type: getRandomElement(TYPES)
    },
    location: {
      x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX) - PIN_WIDTH / 2,
      y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX) - PIN_HEIGHT
    }
  };
  return mapPin;
};

var getMapPins = function (mapPinCount) {
  var mapPins = [];
  for (var i = 0; i < mapPinCount; i++) {
    mapPins.push(getMapPin(i + 1));
  }
  return mapPins;
};

var showActiveMap = function (map) {
  var element = document.querySelector(map);
  element.classList.remove('map--faded');
};

var renderMapPin = function (mapPin) {
  var mapPinElement = pinTemplate.cloneNode(true);
  mapPinElement.style.left = mapPin.location.x + 'px';
  mapPinElement.style.top = mapPin.location.y + 'px';
  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.querySelector('img').alt = mapPin.offer.type;
  return mapPinElement;
};

var renderMapPins = function (mapPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mapPins.length; i++) {
    fragment.appendChild(renderMapPin(mapPins[i]));
  }
  mapPinsList.appendChild(fragment);
};

showActiveMap('.map');
var mapPins = getMapPins(MAP_PIN_COUNT);
renderMapPins(mapPins);
