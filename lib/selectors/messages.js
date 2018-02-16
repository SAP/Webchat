"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getLastMessageId = exports.getLastMessageId = function getLastMessageId(state) {
  var messages = state.messages;


  return messages.length ? messages[messages.length - 1].id : null;
};