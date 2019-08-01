'use strict';
(function () {
  var ANY_VALUE = 'any';
  var PRICE_LEVEL_1 = 10000;
  var PRICE_LEVEL_2 = 50000;
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
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  var housingPriceFilter = function (pin) {
    switch (housingPrice) {
      case 'middle':
        return pin.offer.price >= PRICE_LEVEL_1 && pin.offer.price <= PRICE_LEVEL_2;
      case 'low':
        return pin.offer.price < PRICE_LEVEL_1;
      case 'high':
        return pin.offer.price > PRICE_LEVEL_2;
      default:
        return true;
    }
  };

  var housingRoomsFilter = function (pin) {
    return housingRooms === ANY_VALUE || pin.offer.rooms === housingRooms;
  };

  var housingGuestsFilter = function (pin) {
    return housingGuests === ANY_VALUE || pin.offer.guests === housingGuests;
  };

  var housingFeaturesFilter = function (pin) {
    return housingFeatures.every(function (feature) {
      return pin.offer.features.includes(feature);
    });
  };

  var applyFilter = function (mapPins) {
    housingType = housingTypeElement.value;
    housingPrice = housingPriceElement.value;

    housingRooms = parseInt(housingRoomsElement.value, 10);
    if (isNaN(housingRooms)) {
      housingRooms = housingRoomsElement.value;
    }

    housingGuests = parseInt(housingGuestsElement.value, 10);
    if (isNaN(housingGuests)) {
      housingGuests = housingGuestsElement.value;
    }

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
