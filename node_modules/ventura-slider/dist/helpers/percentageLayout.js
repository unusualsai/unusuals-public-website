'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentageLayout = percentageLayout;

var _getBody = require('./getBody.js');

var _setFakeBody = require('./setFakeBody.js');

var _resetFakeBody = require('./resetFakeBody.js');

function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
      body = (0, _getBody.getBody)(),
      docOverflow = (0, _setFakeBody.setFakeBody)(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;

  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);

  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

  body.fake ? (0, _resetFakeBody.resetFakeBody)(body, docOverflow) : wrapper.remove();

  return supported;
} // get subpixel support value
// @return - boolean