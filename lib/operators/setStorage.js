"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function setStorageFactory(key, value) {
  function setStorage(_ref) {
    var storage = _ref.storage,
        resolve = _ref.resolve,
        path = _ref.path;
    var maybePromise = storage.set(resolve.value(key), resolve.value(value));

    if (maybePromise instanceof Promise && path) {
      return maybePromise.then(function () {
        return path.success();
      })["catch"](function (error) {
        return path.error({
          error: error
        });
      });
    } else if (maybePromise instanceof Promise) {
      return maybePromise;
    }
  }

  return setStorage;
}

var _default = setStorageFactory;
exports["default"] = _default;
//# sourceMappingURL=setStorage.js.map