'use strict';

(function () {

  var ADS_AMOUNT = 8;
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generateAds = function () {
    var adArray = [];

    for (var i = 0; i < ADS_AMOUNT; i++) {
      adArray[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': window.util.getRandomElement(OFFER_TYPE)
        },
        'location': {
          'x': window.util.getRandomNumber(window.util.MAP_PIN_X_MIN, window.util.MAP_PIN_X_MAX),
          'y': window.util.getRandomNumber(window.util.MAP_PIN_Y_MIN, window.util.MAP_PIN_Y_MAX)
        }
      };
    }

    return adArray;
  };

  var ads = generateAds();

  var renderPin = function () {
    var pinElement = similarPinsTemplate.cloneNode(true);
    pinElement.style.cssText = 'left: ' + (ads[i].location.x - window.util.MAP_PIN_WIDTH / 2) + 'px; top: ' + ads[i].location.y + 'px;';
    pinElement.querySelector('img').src = ads[i].author.avatar;
    pinElement.querySelector('img').alt = ads[i].offer.type;
    return pinElement;
  };

  for (var i = 0; i < ads.length; i++) {
    window.util.fragment.appendChild(renderPin(ads[i]));
  }

})();
