'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _store = require('store');

var _channel = require('actions/channel');

var _App = require('containers/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.innerHTML += '<div id="recast-webchat-div"></div>';
var root = document.getElementById('recast-webchat-div');
var script = document.currentScript || document.getElementById('recast-webchat');

var channelId = script.getAttribute('channelId');
var token = script.getAttribute('token');

if (root && channelId && token) {
  (0, _channel.getChannelPreferences)(channelId, token).then(function (preferences) {
    _reactDom2.default.render(_react2.default.createElement(
      _reactRedux.Provider,
      { store: _store.store },
      _react2.default.createElement(_App2.default, { token: token, channelId: channelId, preferences: preferences })
    ), root);
  });
}