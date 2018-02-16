'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _helpers = require('helpers');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Buttons = function Buttons(_ref) {
  var content = _ref.content,
      sendMessage = _ref.sendMessage,
      style = _ref.style;
  var title = content.title,
      buttons = content.buttons;

  return _react2.default.createElement(
    'div',
    { className: 'Buttons' },
    _react2.default.createElement(
      'p',
      { className: 'Buttons--title', style: style },
      (0, _helpers.truncate)(title, 640)
    ),
    _react2.default.createElement(
      'div',
      { className: 'Buttons--container' },
      buttons.slice(0, 3).map(function (b, i) {
        return _react2.default.createElement(_Button2.default, { key: i, button: b, sendMessage: sendMessage });
      })
    )
  );
};

Buttons.propTypes = {
  style: _propTypes2.default.object,
  content: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func
};

exports.default = Buttons;