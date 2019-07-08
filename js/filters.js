'use strict';
(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingType;
  window.filters = {
    filterMapPins: function (mapPins) {
      housingType = housingTypeElement.value;
      var filteredMapPins;
      if (housingType !== 'any') {
        filteredMapPins = mapPins.filter(function (it) {
          return it.offer.type === housingType;
        });
      } else {
        filteredMapPins = mapPins;
      }
      return filteredMapPins;
    }
  };
})();
