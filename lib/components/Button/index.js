'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('helpers');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var button = _ref.button,
      sendMessage = _ref.sendMessage;
  var value = button.value,
      title = button.title;

  var formattedTitle = (0, _helpers.truncate)(title, 20);

  var content = null;

  switch (button.type) {
    case 'web_url':
      content = _react2.default.createElement(
        'a',
        { className: 'RecastAppButton-Link', href: value, target: '_blank' },
        formattedTitle
      );
      break;
    default:
      content = _react2.default.createElement(
        'div',
        {
          className: 'RecastAppButton',
          onClick: function onClick() {
            return sendMessage({ type: 'text', content: value });
          }
        },
        formattedTitle
      );
      break;
  }

  return content;
};

Button.propTypes = {
  button: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func
};

exports.default = Button;