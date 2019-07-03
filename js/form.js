'use strict';

(function () {

  var OFFERS = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var offerType = document.querySelector('#type');
  var offerPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var onOfferType = function () {
    var offerTypeValue = OFFERS[offerType.value];

    offerPrice.min = offerTypeValue;
    offerPrice.placeholder = offerTypeValue;
  };

  offerType.addEventListener('change', onOfferType);

  var onTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeIn);
  timeOut.addEventListener('change', onTimeOut);

})();
