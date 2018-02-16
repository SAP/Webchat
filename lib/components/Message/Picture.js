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

var Picture = function Picture(_ref) {
  var content = _ref.content,
      onImageLoaded = _ref.onImageLoaded;

  return _react2.default.createElement('img', { onLoad: onImageLoaded, src: content, className: 'RecastAppPicture' });
};

Picture.propTypes = {
  content: _propTypes2.default.string,
  onImageLoaded: _propTypes2.default.func
};

exports.default = Picture;