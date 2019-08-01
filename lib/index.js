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

var _StorageProvider = _interopRequireDefault(require("./StorageProvider"));

var _StorageProviderError = _interopRequireDefault(require("./StorageProviderError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(options) {
  return function (_ref) {
    var app = _ref.app,
        name = _ref.name;
    app.once('initialized:model', function () {
      var targetStorage = options.target || localStorage;
      Object.keys(options.sync || {}).forEach(function (syncKey) {
        var value = targetStorage.getItem(options.prefix + syncKey);

        if (!value) {
          return;
        }

        var path = options.sync[syncKey].split('.');
        app.model.set(path, options.json ? JSON.parse(value) : value); // Works on V5
      });
    });

    if (options.sync) {
      // Not tested
      app.on('flush', function (changes) {
        changes.forEach(function (change) {
          Object.keys(options.sync).forEach(function (syncKey) {
            if (change.path.join('.').indexOf(options.sync[syncKey]) === 0) {
              var value = app.getState(options.sync[syncKey]);
              value === undefined ? options.target.removeItem(options.prefix + syncKey) : options.target.setItem(options.prefix + syncKey, options.json ? JSON.stringify(value) : value);
            }
          });
        });
      });
    }

    return {
      providers: _defineProperty({}, name, (0, _StorageProvider["default"])(options))
    };
  };
};

exports["default"] = _default;
//# sourceMappingURL=index.js.map