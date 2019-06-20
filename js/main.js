'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 32;
var PIN_MAIN_HEIGHT = 32;
var locationPinMainX = 570;
var locationPinMainY = 375;

var mapPinsListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var fieldsetElements = document.querySelectorAll('.ad-form__element');
var fieldsetHeaderElement = document.querySelector('.ad-form-header');
var mapPinMainElement = document.querySelector('.map__pin--main');
var formElement = document.querySelector('.ad-form');
var mapFilterSelectElements = document.querySelectorAll('.map__filter');
var mapFeaturesElement = document.querySelector('.map__features');
var addressElement = document.querySelector('#address');
var priceElement = document.querySelector('#price');
var typeAccommodationElement = document.querySelector('#type');
var timeInElement = document.querySelector('#timein');
var timeOutElement = document.querySelector('#timeout');

var showActiveForm = function () {
  formElement.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].disabled = false;
  }
  fieldsetHeaderElement.disabled = false;
};

var showActiveMapFilters = function () {
  for (var i = 0; i < mapFilterSelectElements.length; i++) {
    mapFilterSelectElements[i].disabled = false;
  }
  mapFeaturesElement.disabled = false;
};

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

var getMapPins = function () {
  var mapPins = [];
  for (var i = 0; i < 8; i++) {
    mapPins.push(getMapPin(i + 1));
  }
  return mapPins;
};

var showActiveMap = function () {
  var element = document.querySelector('.map');
  element.classList.remove('map--faded');
};

var renderMapPin = function (mapPin) {
  var mapPinElement = pinTemplate.cloneNode(true);
  var pinElement = mapPinElement.querySelector('img');
  mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
  pinElement.src = mapPin.author.avatar;
  pinElement.alt = mapPin.offer.type;
  return mapPinElement;
};

var renderMapPins = function (mapPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mapPins.length; i++) {
    fragment.appendChild(renderMapPin(mapPins[i]));
  }
  mapPinsListElement.appendChild(fragment);
};

var showActiveState = function () {
  showActiveForm();
  showActiveMapFilters();
  showActiveMap();
  var mapPins = getMapPins();
  renderMapPins(mapPins);
};

var setAddress = function () {
  addressElement.value = (locationPinMainX + PIN_MAIN_WIDTH) + ', ' + (locationPinMainY + PIN_MAIN_HEIGHT);
};

mapPinMainElement.addEventListener('click', function () {
  showActiveState();
});

mapPinMainElement.addEventListener('mouseup', function () {
  setAddress();
});

typeAccommodationElement.addEventListener('change', function () {
  setPrice(typeAccommodationElement.value);
});

var setPrice = function (typeValue) {
  if (typeValue === 'bungalo') {
    priceElement.minlength = 0;
    priceElement.placeholder = 0;
  }
  if (typeValue === 'flat') {
    priceElement.minlength = 1000;
    priceElement.placeholder = 1000;
  }
  if (typeValue === 'house') {
    priceElement.minlength = 5000;
    priceElement.placeholder = 5000;
  }
  if (typeValue === 'palace') {
    priceElement.minlength = 10000;
    priceElement.placeholder = 10000;
  }
};

timeInElement.addEventListener('change', function () {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', function () {
  timeInElement.value = timeOutElement.value;
});
