'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var closeWebchat = _ref.closeWebchat,
      preferences = _ref.preferences;
  return _react2.default.createElement(
    'div',
    {
      className: 'RecastAppHeader',
      style: {
        color: preferences.complementaryColor,
        backgroundColor: preferences.accentColor
      }
    },
    _react2.default.createElement('img', { className: 'RecastAppHeader--logo', src: preferences.headerLogo }),
    _react2.default.createElement(
      'div',
      { className: 'RecastAppHeader--title' },
      preferences.headerTitle
    ),
    _react2.default.createElement(
      'div',
      { className: 'RecastAppHeader--btn', onClick: closeWebchat },
      _react2.default.createElement('img', { src: 'https://cdn.recast.ai/webchat/close.svg' })
    )
  );
};

Header.propTypes = {
  closeWebchat: _propTypes2.default.func,
  preferences: _propTypes2.default.object
};

exports.default = Header;