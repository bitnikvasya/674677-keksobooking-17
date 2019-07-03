'use strict';

(function () {

  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function () {
    var pinElement = similarPinsTemplate.cloneNode(true);
    pinElement.style.cssText = 'left: ' + (window.data.ads[i].location.x - window.util.MAP_PIN_WIDTH / 2) + 'px; top: ' + window.data.ads[i].location.y + 'px;';
    pinElement.querySelector('img').src = window.data.ads[i].author.avatar;
    pinElement.querySelector('img').alt = window.data.ads[i].offer.type;
    return pinElement;
  };

  for (var i = 0; i < window.data.ads.length; i++) {
    window.util.fragment.appendChild(renderPin(window.data.ads[i]));
  }

})();
