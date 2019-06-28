'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');

  var mapFilterSelectElements = document.querySelectorAll('.map__filter');
  var mapFeaturesElement = document.querySelector('.map__features');

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

  var renderMapPins = function (mapPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < mapPins.length; i++) {
      fragment.appendChild(renderMapPin(mapPins[i]));
    }
    mapPinsListElement.appendChild(fragment);
  };

  window.map = {
    showActiveStatePage: function () {
      window.form.showActiveForm();
      showActiveMapFilters();
      showActiveMap();
      var mapPins = window.data.getData();
      renderMapPins(mapPins);
    }
  };
})();
