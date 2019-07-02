'use strict';

var ADS_AMOUNT = 8;
var MAP_PIN_MAIN_HEIGHT = 88;
var MAP_PIN_MAIN_WIDTH = 70;
var MAP_PIN_WIDTH = 50;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFERS = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var MAP_PIN_X_MIN = 0;
var MAP_PIN_X_MAX = 1200;
var MAP_PIN_Y_MIN = 130;
var MAP_PIN_Y_MAX = 630;

var map = document.querySelector('.map');

var similarListElement = map.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Случайное число от min до max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Случайное число от 0 до длины массива
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

// Массив с объектами
var generateAds = function () {
  var adArray = [];

  for (var i = 0; i < ADS_AMOUNT; i++) {
    adArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': getRandomElement(OFFER_TYPE)
      },
      'location': {
        'x': getRandomNumber(MAP_PIN_X_MIN, MAP_PIN_X_MAX),
        'y': getRandomNumber(MAP_PIN_Y_MIN, MAP_PIN_Y_MAX)
      }
    };
  }

  return adArray;
};

var ads = generateAds();

var renderPin = function () {
  var pinElement = similarPinsTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + (ads[i].location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + ads[i].location.y + 'px;';
  pinElement.querySelector('img').src = ads[i].author.avatar;
  pinElement.querySelector('img').alt = ads[i].offer.type;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

var adForm = document.querySelector('.ad-form');
var fieldset = adForm.querySelectorAll('fieldset');

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

var mapPinMain = document.querySelector('.map__pin--main');

var address = adForm.querySelector('#address');

var setPinMainPosition = function () {
  var mapPinMainActivePosition = mapPinMain.offsetLeft + ', ' + (mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT - MAP_PIN_MAIN_WIDTH / 2);
  address.setAttribute('value', mapPinMainActivePosition);
};


var onMapPinMainClick = function () {
  removeAttributeDisabled(fieldset);
  map.classList.remove('map--faded');
  similarListElement.appendChild(fragment);
  adForm.classList.remove('ad-form--disabled');
  setPinMainPosition();
  mapPinMain.removeEventListener('click', onMapPinMainClick);
};

var offerType = document.querySelector('#type');
var offerPrice = document.querySelector('#price');

var onOfferType = function () {
  var offerTypeValue = OFFERS[offerType.value];

  offerPrice.min = offerTypeValue;
  offerPrice.placeholder = offerTypeValue;
};

offerType.addEventListener('change', onOfferType);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var onTimeIn = function () {
  timeOut.value = timeIn.value;
};

var onTimeOut = function () {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeIn);
timeOut.addEventListener('change', onTimeOut);

mapPinMain.addEventListener('mousedown', function (evt) {
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
      var yPosition = mapPinMain.offsetTop - shift.y;

      if (yPosition < MAP_PIN_Y_MIN) {
        yPosition = MAP_PIN_Y_MIN;
      }

      if (yPosition > MAP_PIN_Y_MAX) {
        yPosition = MAP_PIN_Y_MAX;
      }

      return yPosition;
    };

    var getXPosition = function () {
      var xPosition = mapPinMain.offsetLeft - shift.x;

      if (xPosition < MAP_PIN_X_MIN) {
        xPosition = MAP_PIN_X_MIN;
      }

      if (xPosition > MAP_PIN_X_MAX - MAP_PIN_MAIN_WIDTH) {
        xPosition = MAP_PIN_X_MAX - MAP_PIN_MAIN_WIDTH;
      }

      return xPosition;
    };

    mapPinMain.style.top = getYPosition() + 'px';
    mapPinMain.style.left = getXPosition() + 'px';

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
