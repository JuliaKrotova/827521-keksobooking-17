'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPins = [];
  var filteredMapPins = [];

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

  var renderMapPin = function (mapPin, index) {
    var mapPinElement = pinTemplate.cloneNode(true);
    var pinElement = mapPinElement.querySelector('img');
    mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
    pinElement.src = mapPin.author.avatar;
    pinElement.alt = mapPin.offer.type;
    mapPinElement.setAttribute('data-id', index);
    return mapPinElement;
  };

  var renderMapPins = function () {
    clearMapPins();
    var fragment = document.createDocumentFragment();
    filteredMapPins = filteredMapPins.slice(0, 5);
    filteredMapPins.forEach(function (filteredMapPin, index) {
      fragment.appendChild(renderMapPin(filteredMapPin, index));
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

  var onLoadError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var onLoadSuccess = function (data) {
    mapPins = data;
    filteredMapPins = window.filters.filterMapPins(mapPins);
    renderMapPins();
    addClickToMapPin();
  };


  var addClickToMapPin = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    mapPinsElements.forEach(function (mapPinsElement) {
      mapPinsElement.addEventListener('click', onClick);
    });
  };


  var onClick = function (evt) {
    var index = evt.currentTarget.getAttribute('data-id');
    window.card.renderCard(filteredMapPins[index]);
  };

  housingTypeElement.addEventListener('change', function () {
    filteredMapPins = window.filters.filterMapPins(mapPins);
    renderMapPins();
  });

  window.map = {
    showActiveStatePage: function () {
      window.form.showActiveForm();
      showActiveMapFilters();
      showActiveMap();
      window.backend.load(onLoadSuccess, onLoadError);
    }
  };
})();
