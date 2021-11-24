'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEvents = addEvents;

var _passiveOption = require('./passiveOption.js');

function addEvents(el, obj) {
  for (var prop in obj) {
    var option = prop === 'touchstart' || prop === 'touchmove' ? _passiveOption.passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}