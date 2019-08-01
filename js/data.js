'use strict';

(function () {

  var ADS_AMOUNT = 8;
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var generateAds = function () {
    var adArray = [];

    for (var i = 0; i < ADS_AMOUNT; i++) {
      adArray[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': window.util.getRandomElement(OFFER_TYPES)
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

  window.data = {
    ads: ads
  };

})();
