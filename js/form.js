'use strict';

(function () {
  var fieldsetElements = document.querySelectorAll('.ad-form__element');
  var fieldsetHeaderElement = document.querySelector('.ad-form-header');
  var formElement = document.querySelector('.ad-form');
  var addressElement = document.querySelector('#address');
  var priceElement = document.querySelector('#price');
  var PIN_MAIN_WIDTH = 32;
  var PIN_MAIN_HEIGHT = 32;
  var typeAccommodationElement = document.querySelector('#type');
  var checkInTimeElement = document.querySelector('#timein');
  var checkOutTimeElement = document.querySelector('#timeout');


  window.showActiveForm = function () {
    formElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].disabled = false;
    }
    fieldsetHeaderElement.disabled = false;
  };

  window.setAddress = function (endCoords) {
    addressElement.value = (endCoords.x + PIN_MAIN_WIDTH) + ', ' + (endCoords.y + PIN_MAIN_HEIGHT);
  };

  typeAccommodationElement.addEventListener('change', function () {
    setPrice(typeAccommodationElement.value);
  });

  var setPrice = function (typeValue) {
    switch (typeValue) {
      case 'bungalo':
        priceElement.min = 0;
        priceElement.placeholder = 0;
        break;
      case 'flat':
        priceElement.min = 1000;
        priceElement.placeholder = 1000;
        break;
      case 'house':
        priceElement.min = 5000;
        priceElement.placeholder = 5000;
        break;
      case 'palace':
        priceElement.min = 10000;
        priceElement.placeholder = 10000;
        break;
      default:
        throw new Error('unknown type');
    }
  };

  checkInTimeElement.addEventListener('change', function () {
    checkOutTimeElement.value = checkInTimeElement.value;
  });

  checkOutTimeElement.addEventListener('change', function () {
    checkInTimeElement.value = checkOutTimeElement.value;
  });
})();
