'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPins = [];

  var pinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var mapFilterSelectElements = document.querySelectorAll('.map__filter');
  var mapFeaturesElement = document.querySelector('.map__features');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingType;

  var showActiveMapFilters = function () {
    for (var i = 0; i < mapFilterSelectElements.length; i++) {
      mapFilterSelectElements[i].disabled = false;
    }
    mapFeaturesElement.disabled = false;
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

  var clearMapPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinsElements.length; i++) {
      if (!mapPinsElements[i].classList.contains('map__pin--main')) {
        mapPinsElements[i].remove();
      }
    }
  };

  var renderMapPins = function (filteredMapPins) {
    clearMapPins();
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < filteredMapPins.length; j++) {
      fragment.appendChild(renderMapPin(filteredMapPins[j]));
    }
    mapPinsListElement.appendChild(fragment);
  };

  var onErrorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var onLoadHandler = function (data) {
    mapPins = data;
    mapPins = mapPins.filter(function (it, i) {
      return i < 5;
    });
    renderMapPins(mapPins);
  };

  housingTypeElement.addEventListener('change', function () {
    housingType = housingTypeElement.value;
    updateMapPins();
  });

  var updateMapPins = function () {
    var sameMapPins;
    if (housingType !== 'any') {
      sameMapPins = mapPins.filter(function (it) {
        return it.offer.type === housingType;
      });
    } else {
      sameMapPins = mapPins;
    }
    renderMapPins(sameMapPins);
  };

  window.map = {
    showActiveStatePage: function () {
      window.form.showActiveForm();
      showActiveMapFilters();
      showActiveMap();
      window.backend.load(onLoadHandler, onErrorHandler);
    }
  };
})();
