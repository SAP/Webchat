'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCredentialsFromCookie = exports.storeCredentialsInCookie = exports.truncate = undefined;

var _cookiesJs = require('cookies-js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var truncate = exports.truncate = function truncate(string, length) {
  if (string.length <= length) {
    return string;
  }

  return string.slice(0, length - 3) + '...';
};

var storeCredentialsInCookie = exports.storeCredentialsInCookie = function storeCredentialsInCookie(chatId, conversationId, timeToLive) {
  var payload = { chatId: chatId, conversationId: conversationId };
  _cookiesJs2.default.set('recast-conversation', JSON.stringify(payload), { expires: 3600 * timeToLive });
};

var getCredentialsFromCookie = exports.getCredentialsFromCookie = function getCredentialsFromCookie() {
  var credentials = _cookiesJs2.default.get('recast-conversation');

  if (credentials) {
    try {
      credentials = JSON.parse(credentials);
      return credentials;
    } catch (err) {} // eslint-disable-line no-empty
  }

  return null;
};