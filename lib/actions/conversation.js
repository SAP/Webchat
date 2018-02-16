'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConversation = exports.setCredentials = undefined;

var _reduxActions = require('redux-actions');

var setCredentials = exports.setCredentials = (0, _reduxActions.createAction)('SET_CREDENTIALS');

var createConversation = exports.createConversation = (0, _reduxActions.createAction)('API:CREATE_CONVERSATION', function (channelId, token) {
  return {
    url: '/webhook/' + channelId + '/conversations',
    method: 'post',
    headers: { Authorization: token }
  };
});