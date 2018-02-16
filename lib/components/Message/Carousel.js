'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _arrows = require('components/arrows');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carousel = function Carousel(_ref) {
  var content = _ref.content,
      sendMessage = _ref.sendMessage;

  return _react2.default.createElement(
    'div',
    { className: 'RecastAppCarousel' },
    _react2.default.createElement(
      _reactSlick2.default,
      {
        arrows: true,
        centerMode: true,
        centerPadding: 10,
        speed: 200,
        infinite: false,
        draggable: false,
        slidesToScroll: 1,
        className: 'Slider',
        prevArrow: _react2.default.createElement(_arrows.PrevArrow, null),
        nextArrow: _react2.default.createElement(_arrows.NextArrow, null)
      },
      content.map(function (card, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          _react2.default.createElement(_Card2.default, { content: card, sendMessage: sendMessage })
        );
      })
    )
  );
};

Carousel.propTypes = {
  content: _propTypes2.default.array,
  sendMessage: _propTypes2.default.func
};

exports.default = Carousel;