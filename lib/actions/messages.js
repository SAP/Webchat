'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pollMessages = exports.getMessages = exports.postMessage = undefined;

var _reduxActions = require('redux-actions');

var postMessage = exports.postMessage = (0, _reduxActions.createAction)('API:POST_MESSAGE', function (channelId, token, data) {
  return {
    url: '/webhook/' + channelId,
    method: 'post',
    headers: { Authorization: token },
    data: data
  };
});

var getMessages = exports.getMessages = (0, _reduxActions.createAction)('API:GET_MESSAGES', function (channelId, token, conversationId) {
  return {
    url: '/webhook/' + channelId + '/conversations/' + conversationId + '/messages',
    method: 'get',
    headers: { Authorization: token }
  };
});

var pollMessages = exports.pollMessages = (0, _reduxActions.createAction)('API:POLL_MESSAGES', function (channelId, token, conversationId, lastMessageId) {
  return {
    url: '/webhook/' + channelId + '/conversations/' + conversationId + '/poll',
    method: 'get',
    headers: { Authorization: token },
    query: { last_message_id: lastMessageId } // eslint-disable-line camelcase
  };
});