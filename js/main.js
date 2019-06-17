'use strict';

var ADS_AMOUNT = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Случайное число от 0 до длины массива
var getRandomArray = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Случайное число от min до max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Массив с объектами
var generateAds = function () {
  var ads = [];

  for (var i = 0; i < ADS_AMOUNT; i++) {
  ads[i] = {
    'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
    'offer': {
        'type': OFFER_TYPE[getRandomArray(OFFER_TYPE)]
      },
    'location': {
        'x': getRandomNumber(0, 1200),
        'y': getRandomNumber(130, 630)
      }
  };

  return ads;
}

var renderPin = function (pin) {
  var pinElement = similarPinsTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

similarListElement.appendChild(fragment);
