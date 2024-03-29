'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinsListElement = document.querySelector('.map__pins');
  var mapPins = [];
  var filteredMapPins = [];

  var pinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var formFilterElement = document.querySelector('.map__filters');
  var mapFilterSelectElements = document.querySelectorAll('.map__filter');
  var mapFeaturesElement = document.querySelector('.map__features');
  var mapSectionElement = document.querySelector('.map');

  var showActiveStatePage = function () {
    window.form.showActiveForm();
    showActiveMapFilters();
    showActiveMap();
    window.backend.load(onLoadSuccess, window.map.onLoadError);
  };

  var onLoadError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var showActiveMapFilters = function () {
    mapFilterSelectElements.forEach(function (element) {
      element.disabled = false;
    });
    mapFeaturesElement.disabled = false;
  };

  var showDisabledMapFilters = function () {
    mapFilterSelectElements.forEach(function (element) {
      element.disabled = true;
    });
    mapFeaturesElement.disabled = true;
  };

  var showActiveMap = function () {
    mapSectionElement.classList.remove('map--faded');
  };

  var showDisabledMap = function () {
    mapSectionElement.classList.add('map--faded');
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

    addClickToMapPin();
  };

  var clearMapPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    mapPinsElements.forEach(function (mapPinsElement) {
      if (!mapPinsElement.matches('.map__pin--main')) {
        mapPinsElement.remove();
      }
    });
  };

  var onLoadSuccess = function (data) {
    mapPins = data;
    filteredMapPins = window.filters.applyFilter(mapPins);
    renderMapPins();
  };


  var addClickToMapPin = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    mapPinsElements.forEach(function (mapPinsElement) {
      mapPinsElement.addEventListener('click', onClick);
    });
  };


  var onClick = function (evt) {
    var index = evt.currentTarget.getAttribute('data-id');
    if (index) {
      window.card.renderCard(filteredMapPins[index]);
    }
  };

  var renderMapPinsDebounced = window.debounce(renderMapPins);

  formFilterElement.addEventListener('change', function () {
    filteredMapPins = window.filters.applyFilter(mapPins);
    renderMapPinsDebounced();
  });


  window.map = {
    showActiveStatePage: showActiveStatePage,
    onLoadError: onLoadError,
    clearMapPins: clearMapPins,
    showDisabledMap: showDisabledMap,
    showDisabledMapFilters: showDisabledMapFilters
  };
})();
