'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 32;
var PIN_MAIN_HEIGHT = 32;
var PIN_MAIN_MIN_X = 0;
var PIN_MAIN_MAX_X = 1200;
var PIN_MAIN_MIN_Y = 130;
var PIN_MAIN_MAX_Y = 630;

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
var checkInTimeElement = document.querySelector('#timein');
var checkOutTimeElement = document.querySelector('#timeout');


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

var setAddress = function (endCoords) {
  addressElement.value = (endCoords.x + PIN_MAIN_WIDTH) + ', ' + (endCoords.y + PIN_MAIN_HEIGHT);
};

var onMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var endCoords = {
      x: (mapPinMainElement.offsetLeft - shift.x),
      y: (mapPinMainElement.offsetTop - shift.y)
    };

    if (endCoords.y >= PIN_MAIN_MIN_Y && endCoords.y <= PIN_MAIN_MAX_Y) {
      mapPinMainElement.style.top = endCoords.y + 'px';
    }
    if (endCoords.x >= PIN_MAIN_MIN_X - PIN_MAIN_WIDTH / 2 && endCoords.x <= PIN_MAIN_MAX_X - PIN_MAIN_WIDTH) {
      mapPinMainElement.style.left = endCoords.x + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    showActiveState();

    var shift = {
      x: startCoords.x - upEvt.clientX,
      y: startCoords.y - upEvt.clientY
    };

    var endCoords = {
      x: (mapPinMainElement.offsetLeft - shift.x),
      y: (mapPinMainElement.offsetTop - shift.y)
    };

    setAddress(endCoords);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    mapPinMainElement.removeEventListener('mousedown', onMouseDown);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mapPinMainElement.addEventListener('mousedown', onMouseDown);


typeAccommodationElement.addEventListener('change', function () {
  setPrice(typeAccommodationElement.value);
});

var setPrice = function (typeValue) {
  switch (typeValue) {
    case 'bungalo':
      priceElement.min = 0;
      priceElement.placeholder = 0;
      break;
    case 'flat':
      priceElement.min = 1000;
      priceElement.placeholder = 1000;
      break;
    case 'house':
      priceElement.min = 5000;
      priceElement.placeholder = 5000;
      break;
    case 'palace':
      priceElement.min = 10000;
      priceElement.placeholder = 10000;
      break;
    default:
      throw new Error('unknown type');
  }
};

checkInTimeElement.addEventListener('change', function () {
  checkOutTimeElement.value = checkInTimeElement.value;
});

checkOutTimeElement.addEventListener('change', function () {
  checkInTimeElement.value = checkOutTimeElement.value;
});
