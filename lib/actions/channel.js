'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelPreferences = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChannelPreferences = exports.getChannelPreferences = function getChannelPreferences(channelId, token) {
  return fetch(_config2.default.apiUrl + '/webhook/' + channelId + '/preferences', {
    method: 'get',
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.results;
  });
};