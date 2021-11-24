"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEventsByClone = removeEventsByClone;
function removeEventsByClone(el) {
  var elClone = el.cloneNode(true),
      parent = el.parentNode;
  parent.insertBefore(elClone, el);
  parent.removeChild(el);
}