'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mapElement = document.querySelector('.map');
  var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var HousingType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var renderCard = function (mapPin) {
    removeCard();
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').innerText = mapPin.offer.title;
    cardElement.querySelector('.popup__text--address').innerText = mapPin.offer.address;
    cardElement.querySelector('.popup__text--price').innerText = mapPin.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').innerText = HousingType[mapPin.offer.type];
    cardElement.querySelector('.popup__text--capacity').innerText = mapPin.offer.rooms + ' комнаты для ' + mapPin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + mapPin.offer.checkin + ', выезд до ' + mapPin.offer.checkout;
    renderFeatures(cardElement.querySelector('.popup__features'), mapPin.offer.features);
    cardElement.querySelector('.popup__description').innerText = mapPin.offer.description;
    renderPhotos(cardElement.querySelector('.popup__photos'), mapPin.offer.photos);
    cardElement.querySelector('.popup__avatar').src = mapPin.author.avatar;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardElement);
    mapElement.insertBefore(fragment, mapFiltersContainerElement);

    var cardCloseElement = document.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', function () {
      removeCard();
    });

    document.addEventListener('keydown', onCardEscPress);
  };

  var removeCard = function () {
    var existingCardElement = document.querySelector('.map__card');
    if (existingCardElement) {
      existingCardElement.remove();
    }
  };

  var renderFeatures = function (popupFeaturesElement, features) {
    popupFeaturesElement.innerText = '';
    features.forEach(function (feature) {
      var itemElement = document.createElement('li');
      itemElement.classList.add('popup__feature', 'popup__feature--' + feature);
      popupFeaturesElement.appendChild(itemElement);
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

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };

})();
