'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sanitizeHtmlReact = require('sanitize-html-react');

var _sanitizeHtmlReact2 = _interopRequireDefault(_sanitizeHtmlReact);

var _helpers = require('helpers');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(_ref) {
  var content = _ref.content,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    { style: style, className: 'RecastAppText' },
    (0, _sanitizeHtmlReact2.default)((0, _helpers.truncate)(content, 640)).replace(/&amp;/g, 'g').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  );
};

Text.propTypes = {
  style: _propTypes2.default.object,
  content: _propTypes2.default.string
};

exports.default = Text;