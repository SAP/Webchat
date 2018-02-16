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

var Expander = function Expander(_ref) {
  var onClick = _ref.onClick,
      preferences = _ref.preferences;
  return _react2.default.createElement(
    'div',
    {
      onClick: onClick,
      className: 'RecastAppExpander',
      style: {
        color: preferences.complementaryColor,
        backgroundColor: preferences.accentColor
      }
    },
    preferences.expanderLogo && _react2.default.createElement('img', { className: 'RecastAppExpander--logo', src: preferences.expanderLogo }),
    preferences.expanderTitle,
    preferences.onboardingMessage && _react2.default.createElement(
      'div',
      { className: 'RecastAppExpander--onboarding' },
      preferences.onboardingMessage
    )
  );
};

Expander.propTypes = {
  preferences: _propTypes2.default.object,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = Expander;