"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getStorageFactory(key) {
  function getStorage(_ref) {
    var storage = _ref.storage,
        resolve = _ref.resolve,
        path = _ref.path;
    var value = storage.get(resolve.value(key));

    if (value instanceof Promise && path) {
      return value.then(function () {
        return path.success();
      })["catch"](function (error) {
        return path.error({
          error: error
        });
      });
    } else if (value instanceof Promise) {
      return value.then(function (value) {
        return {
          value: value
        };
      });
    }

    return {
      value: value
    };
  }

  return getStorage;
}

var _default = getStorageFactory;
exports["default"] = _default;
//# sourceMappingURL=getStorage.js.map