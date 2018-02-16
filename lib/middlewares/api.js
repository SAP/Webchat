'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  return function (next) {
    return function (action) {
      if (!action.type.startsWith('API:')) {
        return next(action);
      }

      var dispatch = store.dispatch;

      var prefix = action.type.split(':')[1];
      var _action$payload = action.payload,
          _action$payload$metho = _action$payload.method,
          method = _action$payload$metho === undefined ? 'get' : _action$payload$metho,
          url = _action$payload.url,
          data = _action$payload.data,
          headers = _action$payload.headers,
          query = _action$payload.query;


      var payload = {
        method: method,
        body: JSON.stringify(data),
        headers: _extends({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }, headers)
      };

      var fullUrl = '' + _config2.default.apiUrl + url + (query ? '?' : '') + _queryString2.default.stringify(query || {});
      return fetch(fullUrl, payload).then(function (res) {
        return res.json();
      }).then(function (data) {
        dispatch({ type: prefix + '_SUCCESS', payload: _extends({}, data.results) });
        return data.results;
      }).catch(function (err) {
        dispatch({ type: prefix + '_ERROR' });
        throw new Error(err);
      });
    };
  };
};