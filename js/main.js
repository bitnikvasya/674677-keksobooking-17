'use strict';

var ADS_AMOUNT = 8;
var MAP_PIN_MAIN_HEIGHT = 88;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

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
var mapPinMainPosition = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
var mapPinMainActivePosition = mapPinMain.offsetLeft + ', ' + (mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT - 35);

address.setAttribute('value', mapPinMainPosition);

var onMapPinMainClick = function () {
  removeAttributeDisabled(fieldset);
  map.classList.remove('map--faded');
  similarListElement.appendChild(fragment);
  adForm.classList.remove('ad-form--disabled');
  address.removeAttribute('value', mapPinMainPosition);
  address.setAttribute('value', mapPinMainActivePosition);
  mapPinMain.removeEventListener('click', onMapPinMainClick);
};

mapPinMain.addEventListener('click', onMapPinMainClick);

var offers = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var offerType = document.querySelector('#type');
var offerPrice = document.querySelector('#price');

var onOfferType = function () {
  offerPrice.min = offers[offerType.value];
  offerPrice.placeholder = offers[offerType.value];
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
