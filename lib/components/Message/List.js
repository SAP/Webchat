'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require('helpers');

var _Button = require('components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListElement = function ListElement(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      imageUrl = _ref.imageUrl,
      buttons = _ref.buttons,
      sendMessage = _ref.sendMessage;

  var button = buttons[0];

  return _react2.default.createElement(
    'div',
    { className: 'RecastAppListElement' },
    imageUrl && _react2.default.createElement('img', { src: imageUrl, className: 'RecastAppListElement--img' }),
    _react2.default.createElement(
      'div',
      { className: 'RecastAppListElement--container' },
      _react2.default.createElement(
        'p',
        { className: 'RecastAppListElement--title' },
        (0, _helpers.truncate)(title, 25)
      ),
      _react2.default.createElement(
        'p',
        { className: 'RecastAppListElement--subtitle' },
        (0, _helpers.truncate)(subtitle, 50)
      ),
      button && _react2.default.createElement(
        'div',
        {
          className: 'RecastAppListElement--button',
          onClick: function onClick() {
            return sendMessage({ type: 'text', content: button.value });
          }
        },
        (0, _helpers.truncate)(button.title, 20)
      )
    )
  );
};

ListElement.propTypes = {
  title: _propTypes2.default.string,
  subtitle: _propTypes2.default.string,
  imageUrl: _propTypes2.default.string,
  buttons: _propTypes2.default.array,
  sendMessage: _propTypes2.default.func
};

var List = function List(_ref2) {
  var content = _ref2.content,
      sendMessage = _ref2.sendMessage;

  var button = content.buttons && content.buttons[0];

  return _react2.default.createElement(
    'div',
    { className: 'RecastAppList' },
    content.elements.map(function (element, i) {
      return _react2.default.createElement(ListElement, _extends({ key: i }, element, { sendMessage: sendMessage }));
    }),
    button && _react2.default.createElement(
      'div',
      { className: 'RecastAppList--button' },
      _react2.default.createElement(_Button2.default, { button: button, sendMessage: sendMessage })
    )
  );
};

List.propTypes = {
  content: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func
};

exports.default = List;