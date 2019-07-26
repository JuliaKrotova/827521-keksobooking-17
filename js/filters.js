'use strict';
(function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');
  var housingType;
  var housingRooms;
  var housingPrice;
  var housingGuests;
  var housingFeaturesCheckedElements;
  var housingFeatures;

  var housingTypeFilter = function (pin) {
    return housingType === 'any' || pin.offer.type === housingType;
  };

  var housingPriceFilter = function (pin) {
    switch (housingPrice) {
      case 'middle':
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      case 'low':
        return pin.offer.price < 10000;
      case 'high':
        return pin.offer.price > 50000;
      default:
        return true;
    }
  };

  var housingRoomsFilter = function (pin) {
    return isNaN(housingRooms) || pin.offer.rooms === housingRooms;
  };

  var housingGuestsFilter = function (pin) {
    return isNaN(housingGuests) || pin.offer.guests === housingGuests;
  };

  var housingFeaturesFilter = function (pin) {
    return housingFeatures.every(function (feature) {
      return pin.offer.features.includes(feature);
    });
  };

  var applyFilter = function (mapPins) {
    housingType = housingTypeElement.value;
    housingRooms = parseInt(housingRoomsElement.value, 0);
    housingPrice = housingPriceElement.value;
    housingGuests = parseInt(housingGuestsElement.value, 0);
    housingFeaturesCheckedElements = Array.from(housingFeaturesElement.querySelectorAll('input:checked'));
    housingFeatures = housingFeaturesCheckedElements.map(function (element) {
      return element.value;
    });

    return mapPins
  .filter(housingTypeFilter)
  .filter(housingPriceFilter)
  .filter(housingRoomsFilter)
  .filter(housingGuestsFilter)
  .filter(housingFeaturesFilter);
  };

  window.filters = {
    applyFilter: applyFilter
  };
})();
