'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _conversation = require('./conversation');

var _conversation2 = _interopRequireDefault(_conversation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  messages: _messages2.default,
  conversation: _conversation2.default
});