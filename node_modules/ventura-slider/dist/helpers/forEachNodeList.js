"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachNodeList = forEachNodeList;
// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEachNodeList(arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}