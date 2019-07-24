'use strict';
(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');

  var housingTypeFilter = function (mapPins) {
    var housingType = housingTypeElement.value;
    var filteredMapPins;
    if (housingType !== 'any') {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.type === housingType;
      });
    } else {
      filteredMapPins = mapPins;
    }
    return filteredMapPins;
  };

  var housingPriceFilter = function (mapPins) {
    var housingPrice = housingPriceElement.value;
    var filteredMapPins;
    if (housingPrice === 'middle') {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      });
    } else if (housingPrice === 'low') {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (housingPrice === 'high') {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.price > 50000;
      });
    } else {
      filteredMapPins = mapPins;
    }
    return filteredMapPins;
  };

  var housingRoomsFilter = function (mapPins) {
    var housingRooms = parseInt(housingRoomsElement.value, 0);
    var filteredMapPins;
    if (!isNaN(housingRooms)) {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.rooms === housingRooms;
      });
    } else {
      filteredMapPins = mapPins;
    }
    return filteredMapPins;
  };

  var housingGuestsFilter = function (mapPins) {
    var housingGuests = parseInt(housingGuestsElement.value, 0);
    var filteredMapPins;
    if (!isNaN(housingGuests)) {
      filteredMapPins = mapPins.filter(function (it) {
        return it.offer.guests === housingGuests;
      });
    } else {
      filteredMapPins = mapPins;
    }
    return filteredMapPins;
  };

  var housingFeaturesFilter = function (mapPins) {
    var housingFeatures = [];
    var housingFeaturesCheckedElement = housingFeaturesElement.querySelectorAll('input:checked');
    housingFeaturesCheckedElement.forEach(function (housingFeatureCheckedElement) {
      housingFeatures.push(housingFeatureCheckedElement.value);
    });
    var filteredMapPins;
    filteredMapPins = mapPins.filter(function (it) {
      for (var i = 0; i < housingFeatures.length; i++) {
        if (!it.offer.features.includes(housingFeatures[i])) {
          return false;
        }
      }
      return true;
    });
    return filteredMapPins;
  };

  var applyFilter = function (mapPins) {
    var filteredMapPins = housingTypeFilter(mapPins);
    filteredMapPins = housingPriceFilter(filteredMapPins);
    filteredMapPins = housingRoomsFilter(filteredMapPins);
    filteredMapPins = housingGuestsFilter(filteredMapPins);
    filteredMapPins = housingFeaturesFilter(filteredMapPins);
    return filteredMapPins;
  };

  window.filters = {
    applyFilter: applyFilter
  };
})();
