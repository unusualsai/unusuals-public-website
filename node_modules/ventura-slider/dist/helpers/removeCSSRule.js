'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeCSSRule = removeCSSRule;

var _raf = require('./raf.js');

function removeCSSRule(sheet, index) {
  // return raf(function() {
  'deleteRule' in sheet ? sheet.deleteRule(index) : sheet.removeRule(index);
  // });
} // cross browsers addRule method