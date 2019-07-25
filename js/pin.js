'use strict';

(function () {
  var PIN_MAIN_X = 570;
  var PIN_MAIN_Y = 375;
  var PIN_MAIN_MIN_X = 0;
  var PIN_MAIN_MAX_X = 1200;
  var PIN_MAIN_MIN_Y = 130;
  var PIN_MAIN_MAX_Y = 630;
  var PIN_MAIN_WIDTH = 32;

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var getEndCoords = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        x: (mapPinMainElement.offsetLeft - shift.x),
        y: (mapPinMainElement.offsetTop - shift.y)
      };
      return endCoords;
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var endCoords = getEndCoords(moveEvt);

      if (endCoords.y >= PIN_MAIN_MIN_Y && endCoords.y <= PIN_MAIN_MAX_Y) {
        mapPinMainElement.style.top = endCoords.y + 'px';
      }
      if (endCoords.x >= PIN_MAIN_MIN_X - PIN_MAIN_WIDTH / 2 && endCoords.x <= PIN_MAIN_MAX_X - PIN_MAIN_WIDTH) {
        mapPinMainElement.style.left = endCoords.x + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var endCoords = getEndCoords(upEvt);
      window.form.setAddress(endCoords);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMainElement.addEventListener('mousedown', onMouseDown);

  var onClick = function () {
    window.map.showActiveStatePage();
    mapPinMainElement.removeEventListener('click', onClick);
  };

  var showDisabledMapPinMain = function () {
    mapPinMainElement.style.left = PIN_MAIN_X + 'px';
    mapPinMainElement.style.top = PIN_MAIN_Y + 'px';
    mapPinMainElement.addEventListener('click', onClick);
  };

  showDisabledMapPinMain();

  window.pin = {
    showDisabledMapPinMain: showDisabledMapPinMain
  };

})();
