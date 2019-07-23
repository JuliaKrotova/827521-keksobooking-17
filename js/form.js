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
  var ESC_KEYCODE = 27;
  var typeAccommodationElement = document.querySelector('#type');
  var checkInTimeElement = document.querySelector('#timein');
  var checkOutTimeElement = document.querySelector('#timeout');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var submitElement = document.querySelector('.ad-form__submit');
  var mainElement = document.querySelector('main');
  var mapElement = document.querySelector('.map');
  var errorButtonElement = document.querySelector('.error__button');

  var messageSuccessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var messageErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var showActiveForm = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = false;
    });
    fieldsetHeaderElement.disabled = false;
    setRoomElementValidity();
  };

  var showDisabledForm = function () {
    formElement.classList.add('ad-form--disabled');
    fieldsetElements.forEach(function (fieldsetElement) {
      fieldsetElement.disabled = true;
    });
    fieldsetHeaderElement.disabled = true;
    titleElement.value = '';
    priceElement.value = '';
    typeAccommodationElement.value = 'flat';
    roomNumberElement.value = '1';
    capacityElement.value = '3';
    checkInTimeElement.value = '12:00';
    checkOutTimeElement.value = '12:00';
    resetAdress();
  };

  var resetAdress = function () {
    addressElement.value = '570, 375';
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
    return isRoomElementInvalid() ? roomNumberElement.setCustomValidity('Количество комнат не соответствует количеству гостей')
      : roomNumberElement.setCustomValidity('');
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

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), onSubmitSuccess, onSubmitError);
    evt.preventDefault();
  });

  var onSubmitSuccess = function () {
    showDisabledForm();
    window.card.removeCard();
    window.map.clearMapPins();
    window.map.showDisabledMap();
    window.pin.showDisabledMapPinMain();
    renderMessageSuccess();
  };

  var renderMessageSuccess = function () {
    var messageSuccessElement = messageSuccessTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageSuccessElement);
    mainElement.insertBefore(fragment, mapElement);

    document.addEventListener('keydown', onMessageSuccessEscPress);
    document.addEventListener('click', function () {
      removeMessageSuccess();
    });
  };

  var onMessageSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMessageSuccess();
      document.removeEventListener('keydown', onMessageSuccessEscPress);
    }
  };

  var removeMessageSuccess = function () {
    var existingMessageSuccessElement = document.querySelector('.success');
    if (existingMessageSuccessElement) {
      existingMessageSuccessElement.remove();
    }
  };

  var onSubmitError = function () {
    var messageErrorElement = messageErrorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageErrorElement);
    mainElement.insertBefore(fragment, mapElement);

    document.addEventListener('keydown', onMessageErrorEscPress);
    document.addEventListener('click', function () {
      removeMessageError();
    });
    errorButtonElement.addEventListener('click', function () {
      removeMessageError();
    });
  };

  var onMessageErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMessageError();
      document.removeEventListener('keydown', onMessageErrorEscPress);
    }
  };

  var removeMessageError = function () {
    var existingMessageErrorElement = document.querySelector('.error');
    if (existingMessageErrorElement) {
      existingMessageErrorElement.remove();
    }
  };

  window.form = {
    showActiveForm: showActiveForm,
    setAddress: setAddress
  };

  resetAdress();
})();
