'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var initialState = {
  token: '',
  chatId: '',
  channelId: '',
  conversationId: ''
};

exports.default = (0, _reduxActions.handleActions)({
  SET_CREDENTIALS: function SET_CREDENTIALS(state, _ref) {
    var payload = _ref.payload;

    return _extends({}, state, payload);
  },

  CREATE_CONVERSATION_SUCCESS: function CREATE_CONVERSATION_SUCCESS(state, _ref2) {
    var conversation = _ref2.payload;
    var id = conversation.id,
        chatId = conversation.chatId;

    return _extends({}, state, { chatId: chatId, conversationId: id });
  }
}, initialState);