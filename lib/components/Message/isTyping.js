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

var IsTyping = function IsTyping(_ref) {
  var image = _ref.image;
  return _react2.default.createElement(
    'div',
    { className: 'RecastAppMessage bot' },
    image && _react2.default.createElement('img', { className: 'RecastAppMessage--logo visible', src: image }),
    _react2.default.createElement('img', { src: 'https://cdn.recast.ai/webchat/istyping.gif' })
  );
};

IsTyping.propTypes = {
  image: _propTypes2.default.string
};

exports.default = IsTyping;