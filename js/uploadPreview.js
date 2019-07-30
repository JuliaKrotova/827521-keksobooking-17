'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var previewAvatarElement = document.querySelector('.ad-form-header__img');
  var photoChooser = document.querySelector('#images');
  var previewPhotoContainerElement = document.querySelector('.ad-form__photo-container');

  var sourceDragIndex;
  var destDragIndex;

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    loadFile(file, function (result) {
      previewAvatarElement.src = result;
    });
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    loadFile(file, function (result) {
      var div = document.createElement('div');
      div.classList.add('ad-form__photo');
      var img = new Image();
      img.src = result;
      img.width = 70;
      img.height = 70;
      img.setAttribute('draggable', 'true');
      img.addEventListener('dragover', dragOver);
      img.addEventListener('dragend', dragEnd);
      div.appendChild(img);
      previewPhotoContainerElement.appendChild(div);
    });
  });

  var loadFile = function (file, cb) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        cb(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var removePhoto = function () {
    var photoElements = document.querySelectorAll('.ad-form__photo');
    photoElements.forEach(function (element) {
      element.remove();
    });
  };

  var getDraggableElementIndex = function (element) {
    var photoArray = Array.from(document.querySelectorAll('.ad-form__photo img'));
    return photoArray.indexOf(element);
  };

  previewPhotoContainerElement.addEventListener('dragstart', function (evt) {
    sourceDragIndex = getDraggableElementIndex(evt.target);
  });

  var dragOver = function (evt) {
    destDragIndex = getDraggableElementIndex(evt.target);
  };

  var dragEnd = function () {
    var photoArray = Array.from(document.querySelectorAll('.ad-form__photo'));
    previewPhotoContainerElement.insertBefore(photoArray[sourceDragIndex], photoArray[destDragIndex]);
  };

  window.uploadPreview = {
    removePhoto: removePhoto
  };
})();
