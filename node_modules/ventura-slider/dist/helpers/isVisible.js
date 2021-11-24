'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVisible = isVisible;
function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}