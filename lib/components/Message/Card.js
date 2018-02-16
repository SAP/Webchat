'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('helpers');

var _Button = require('components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function Card(_ref) {
  var content = _ref.content,
      sendMessage = _ref.sendMessage,
      onImageLoaded = _ref.onImageLoaded;
  var title = content.title,
      subtitle = content.subtitle,
      imageUrl = content.imageUrl,
      buttons = content.buttons;


  return _react2.default.createElement(
    'div',
    { className: 'RecastAppCard' },
    imageUrl && _react2.default.createElement('img', { src: imageUrl, onLoad: onImageLoaded, className: 'RecastAppCard--img' }),
    _react2.default.createElement(
      'div',
      { className: 'RecastAppCard--text' },
      _react2.default.createElement(
        'p',
        { className: 'RecastAppCard--text-title' },
        (0, _helpers.truncate)(title, 80)
      ),
      subtitle && _react2.default.createElement(
        'p',
        { className: 'Card--text-subtitle' },
        (0, _helpers.truncate)(subtitle, 80)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'RecastAppCard--button-container' },
      buttons.slice(0, 3).map(function (b, i) {
        return _react2.default.createElement(_Button2.default, { key: i, button: b, sendMessage: sendMessage });
      })
    )
  );
};

Card.propTypes = {
  content: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func,
  onImageLoaded: _propTypes2.default.func
};

exports.default = Card;