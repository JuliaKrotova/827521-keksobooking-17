'use strict';

(function () {

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

  window.showActiveState = function () {
    window.showActiveForm();
    showActiveMapFilters();
    showActiveMap();
    var mapPins = window.getMapPins();
    window.renderMapPins(mapPins);
  };
})();
