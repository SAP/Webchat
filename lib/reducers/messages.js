'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = [];

exports.default = (0, _reduxActions.handleActions)({
  POLL_MESSAGES_SUCCESS: function POLL_MESSAGES_SUCCESS(state, _ref) {
    var payload = _ref.payload;

    return [].concat(_toConsumableArray(state), _toConsumableArray(payload.messages));
  },

  GET_MESSAGES_SUCCESS: function GET_MESSAGES_SUCCESS(state, _ref2) {
    var messages = _ref2.payload;

    return messages;
  }
}, initialState);