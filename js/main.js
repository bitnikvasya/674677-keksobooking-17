'use strict';

var ADS_AMOUNT = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var renderPin = function () {
  var pinElement = similarPinsTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + (generateAds[i].location.x - 25) + 'px; top: ' + (generateAds[i].location.y - 70) + 'px;';
  pinElement.querySelector('img').src = generateAds[i].author.avatar;
  pinElement.querySelector('img').alt = generateAds[i].offer.type;
  return pinElement;
};

var ads = generateAds();
var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

similarListElement.appendChild(fragment);
