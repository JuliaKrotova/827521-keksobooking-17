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

  var renderMapPins = function (filteredMapPins) {
    clearMapPins();
    var fragment = document.createDocumentFragment();
    filteredMapPins = filteredMapPins.slice(0, 5);
    filteredMapPins.forEach(function (filteredMapPin) {
      fragment.appendChild(renderMapPin(filteredMapPin));
    });
    mapPinsListElement.appendChild(fragment);
  };

  var clearMapPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    mapPinsElements.forEach(function (mapPinsElement) {
      if (!mapPinsElement.matches('.map__pin--main')) {
        mapPinsElement.remove();
      }
    });
  };

  var onErrorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var onLoadSuccess = function (data) {
    mapPins = data;
    var filteredMapPins = window.filters.filterMapPins(mapPins);
    renderMapPins(filteredMapPins);
  };

  housingTypeElement.addEventListener('change', function () {
    var filteredMapPins = window.filters.filterMapPins(mapPins);
    renderMapPins(filteredMapPins);
  });

  window.map = {
    showActiveStatePage: function () {
      window.form.showActiveForm();
      showActiveMapFilters();
      showActiveMap();
      window.backend.load(onLoadSuccess, onErrorHandler);
    }
  };
})();
