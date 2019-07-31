"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StorageProviderError", {
  enumerable: true,
  get: function get() {
    return _StorageProviderError["default"];
  }
});
exports["default"] = void 0;

var _cerebral = require("cerebral");

var _StorageProviderError = _interopRequireDefault(require("./StorageProviderError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function StorageProvider() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = options.target;
  options.json = 'json' in options ? options.json : true;
  options.prefix = options.prefix ? options.prefix + '.' : '';
  return (0, _cerebral.Provider)({
    get: function get(key) {
      var value = target.getItem(options.prefix + key);

      function resolveValue(value) {
        if (options.json && value) {
          return JSON.parse(value);
        }

        return value;
      }

      if (value instanceof Promise) {
        return value.then(resolveValue)["catch"](function (error) {
          throw new _StorageProviderError["default"](error);
        });
      }

      return resolveValue(value);
    },
    set: function set(key, value) {
      var maybePromise = value === undefined ? target.removeItem(options.prefix + key) : target.setItem(options.prefix + key, options.json ? JSON.stringify(value) : value);

      if (maybePromise instanceof Promise) {
        return maybePromise["catch"](function (error) {
          throw new _StorageProviderError["default"](error);
        });
      }
    },
    remove: function remove(key) {
      var maybePromise = target.removeItem(options.prefix + key);

      if (maybePromise instanceof Promise) {
        return maybePromise["catch"](function (error) {
          throw new _StorageProviderError["default"](error);
        });
      }
    }
  });
}

var _default = StorageProvider;
exports["default"] = _default;
//# sourceMappingURL=StorageProvider.js.map