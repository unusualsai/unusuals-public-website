'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calc = calc;

var _getBody = require('./getBody.js');

var _setFakeBody = require('./setFakeBody.js');

var _resetFakeBody = require('./resetFakeBody.js');

function calc() {
  var doc = document,
      body = (0, _getBody.getBody)(),
      docOverflow = (0, _setFakeBody.setFakeBody)(body),
      div = doc.createElement('div'),
      result = false;

  body.appendChild(div);
  try {
    var str = '(10px * 10)',
        vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
        val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) {
        result = val.replace(str, '');
        break;
      }
    }
  } catch (e) {}

  body.fake ? (0, _resetFakeBody.resetFakeBody)(body, docOverflow) : div.remove();

  return result;
} // get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc();