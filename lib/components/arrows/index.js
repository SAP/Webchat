'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextArrow = exports.PrevArrow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrevArrow = exports.PrevArrow = function PrevArrow(_ref) {
  var className = _ref.className,
      style = _ref.style,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('RecastAppArrow prev', className), style: _extends({}, style), onClick: onClick },
    '<'
  );
};

var NextArrow = exports.NextArrow = function NextArrow(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      onClick = _ref2.onClick;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('RecastAppArrow next', className), style: _extends({}, style), onClick: onClick },
    '>'
  );
};

var arrowPropTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};

PrevArrow.propTypes = arrowPropTypes;
NextArrow.propTypes = arrowPropTypes;