"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function removeStorageFactory(key) {
  function removeStorage(_ref) {
    var storage = _ref.storage,
        resolve = _ref.resolve,
        path = _ref.path;
    var maybePromise = storage.remove(resolve.value(key));

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

  return removeStorage;
}

var _default = removeStorageFactory;
exports["default"] = _default;
//# sourceMappingURL=removeStorage.js.map