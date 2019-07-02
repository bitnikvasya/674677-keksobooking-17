'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarListElement = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldset = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');

  var setAttributeDisabled = function (arr) {
    for (var k = 0; k < arr.length; k++) {
      arr[k].setAttribute('disabled', 'disabled');
    }
  };

  setAttributeDisabled(fieldset);

  var removeAttributeDisabled = function (arr) {
    for (var k = 0; k < arr.length; k++) {
      arr[k].removeAttribute('disabled', 'disabled');
    }
  };

  var setPinMainPosition = function () {
    var mapPinMainActivePosition = window.util.mapPinMain.offsetLeft + ', ' + (window.util.mapPinMain.offsetTop + window.util.MAP_PIN_MAIN_HEIGHT - window.util.MAP_PIN_MAIN_WIDTH / 2);
    address.setAttribute('value', mapPinMainActivePosition);
  };

  var onMapPinMainClick = function () {
    removeAttributeDisabled(fieldset);
    map.classList.remove('map--faded');
    similarListElement.appendChild(window.util.fragment);
    adForm.classList.remove('ad-form--disabled');
    setPinMainPosition();
    window.util.mapPinMain.removeEventListener('click', onMapPinMainClick);
  };

  window.util.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var getYPosition = function () {
        var yPosition = window.util.mapPinMain.offsetTop - shift.y;

        if (yPosition < window.util.MAP_PIN_Y_MIN) {
          yPosition = window.util.MAP_PIN_Y_MIN;
        }

        if (yPosition > window.util.MAP_PIN_Y_MAX) {
          yPosition = window.util.MAP_PIN_Y_MAX;
        }

        return yPosition;
      };

      var getXPosition = function () {
        var xPosition = window.util.mapPinMain.offsetLeft - shift.x;

        if (xPosition < window.util.MAP_PIN_X_MIN) {
          xPosition = window.util.MAP_PIN_X_MIN;
        }

        if (xPosition > window.util.MAP_PIN_X_MAX - window.util.MAP_PIN_MAIN_WIDTH) {
          xPosition = window.util.MAP_PIN_X_MAX - window.util.MAP_PIN_MAIN_WIDTH;
        }

        return xPosition;
      };

      window.util.mapPinMain.style.top = getYPosition() + 'px';
      window.util.mapPinMain.style.left = getXPosition() + 'px';

    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMapPinMainClick();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

})();
