'use strict';

(function () {
  var fieldsetElements = document.querySelectorAll('.ad-form__element');
  var fieldsetHeaderElement = document.querySelector('.ad-form-header');
  var formElement = document.querySelector('.ad-form');
  var titleElement = document.querySelector('#title');
  var addressElement = document.querySelector('#address');
  var priceElement = document.querySelector('#price');
  var PIN_MAIN_WIDTH = 32;
  var PIN_MAIN_HEIGHT = 32;
  var typeAccommodationElement = document.querySelector('#type');
  var checkInTimeElement = document.querySelector('#timein');
  var checkOutTimeElement = document.querySelector('#timeout');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var submitElement = document.querySelector('.ad-form__submit');


  var showActiveForm = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = false;
    });
    fieldsetHeaderElement.disabled = false;
    setRoomElementValidity();
  };

  var setAddress = function (endCoords) {
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

  var setRoomElementValidity = function () {
    if (isRoomElementInvalid()) {
      roomNumberElement.setCustomValidity('Количество комнат не соответствует количеству гостей');
    } else {
      roomNumberElement.setCustomValidity('');
    }
  };

  var isRoomElementInvalid = function () {
    return roomNumberElement.value < capacityElement.value ||
    roomNumberElement.value === 100 && capacityElement.value !== 0;
  };

  roomNumberElement.addEventListener('change', function () {
    setRoomElementValidity();
  });

  capacityElement.addEventListener('change', function () {
    setRoomElementValidity();
  });

  submitElement.addEventListener('click', function () {
    validateRequiredElement(titleElement);
    validateRequiredElement(priceElement);

    if (isRoomElementInvalid()) {
      roomNumberElement.classList.add('input-error');
      capacityElement.classList.add('input-error');
    } else {
      roomNumberElement.classList.remove('input-error');
      capacityElement.classList.remove('input-error');
    }
  });

  var validateRequiredElement = function (element) {
    if (!element.value) {
      element.classList.add('input-error');
    } else {
      element.classList.remove('input-error');
    }
  };

  window.form = {
    showActiveForm: showActiveForm,
    setAddress: setAddress
  };
})();
