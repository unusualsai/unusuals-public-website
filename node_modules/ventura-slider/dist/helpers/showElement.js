'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showElement = showElement;
function showElement(el, forceHide) {
  if (el.style.display === 'none') {
    el.style.display = '';
  }
}