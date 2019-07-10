'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getType = function (typeValue) {
    switch (typeValue) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        throw new Error('unknown type');
    }
  };

  var renderFeatures = function (popupFeaturesElement, features) {
    popupFeaturesElement.innerText = '';
    features.forEach(function (feature) {
      var liElement = document.createElement('li');
      liElement.classList.add('popup__feature', 'popup__feature--' + feature);
      popupFeaturesElement.appendChild(liElement);
    });
  };

  var renderPhotos = function (popupPhotosElement, photos) {
    popupPhotosElement.innerText = '';
    photos.forEach(function (photo) {
      var imgElement = document.createElement('img');
      imgElement.classList.add('popup__photo');
      imgElement.src = photo;
      imgElement.alt = 'Фотография жилья';
      imgElement.width = '45';
      imgElement.height = '40';
      popupPhotosElement.appendChild(imgElement);
    });
  };

  window.card = {
    renderCard: function (mapPin) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').innerText = mapPin.offer.title;
      cardElement.querySelector('.popup__text--address').innerText = mapPin.offer.address;
      cardElement.querySelector('.popup__text--price').innerText = mapPin.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').innerText = getType(mapPin.offer.type);
      cardElement.querySelector('.popup__text--capacity').innerText = mapPin.offer.rooms + ' комнаты для ' + mapPin.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + mapPin.offer.checkin + ', выезд до ' + mapPin.offer.checkout;
      renderFeatures(cardElement.querySelector('.popup__features'), mapPin.offer.features);
      cardElement.querySelector('.popup__description').innerText = mapPin.offer.description;
      renderPhotos(cardElement.querySelector('.popup__photos'), mapPin.offer.photos);

      var fragment = document.createDocumentFragment();
      fragment.appendChild(cardElement);
      mapElement.insertBefore(fragment, mapFiltersContainerElement);
    }
  };

})();
