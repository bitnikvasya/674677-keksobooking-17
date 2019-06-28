'use strict';

var ADS_AMOUNT = 8;
var MAP_PIN_MAIN_HEIGHT = 88;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFERS = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var MAP_PIN_MAIN_Y_MIN = 130;
var MAP_PIN_MAIN_Y_MAX = 630;

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
        'x': getRandomNumber(0, 1200),
        'y': getRandomNumber(130, 630)
      }
    };
  }

  return adArray;
};

var ads = generateAds();

var renderPin = function () {
  var pinElement = similarPinsTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + (ads[i].location.x - 25) + 'px; top: ' + (ads[i].location.y - 70) + 'px;';
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
var mapPinMainStartPosition = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
var mapPinMainPosition = function () {
  var mapPinMainActivePosition = mapPinMain.offsetLeft + ', ' + (mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT - 35);
  address.setAttribute('value', mapPinMainActivePosition);
};
address.setAttribute('value', mapPinMainStartPosition);

var onMapPinMainClick = function () {
  removeAttributeDisabled(fieldset);
  map.classList.remove('map--faded');
  similarListElement.appendChild(fragment);
  adForm.classList.remove('ad-form--disabled');
  mapPinMainPosition();
  mapPinMain.removeEventListener('click', onMapPinMainClick);
};

var offerType = document.querySelector('#type');
var offerPrice = document.querySelector('#price');

var onOfferType = function () {
  offerPrice.min = OFFERS[offerType.value];
  offerPrice.placeholder = OFFERS[offerType.value];
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

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    if ((mapPinMain.offsetTop - shift.y) < MAP_PIN_MAIN_Y_MIN) {
      mapPinMain.style.top = 130 + 'px';
    }

    if ((mapPinMain.offsetTop - shift.y) > MAP_PIN_MAIN_Y_MAX) {
      mapPinMain.style.top = 630 + 'px';
    }


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
