'use strict';

(function () {

  var MAP_PIN_MAIN_HEIGHT = 88;
  var MAP_PIN_MAIN_WIDTH = 70;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_X_MIN = 0;
  var MAP_PIN_X_MAX = 1200;
  var MAP_PIN_Y_MIN = 130;
  var MAP_PIN_Y_MAX = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  // Случайное число от min до max
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Случайное число от 0 до длины массива
  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  window.util = {
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_X_MIN: MAP_PIN_X_MIN,
    MAP_PIN_X_MAX: MAP_PIN_X_MAX,
    MAP_PIN_Y_MIN: MAP_PIN_Y_MIN,
    MAP_PIN_Y_MAX: MAP_PIN_Y_MAX,
    mapPinMain: mapPinMain,
    fragment: fragment,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };

})();
