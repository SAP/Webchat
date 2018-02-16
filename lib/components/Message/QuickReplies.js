'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _helpers = require('helpers');

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _arrows = require('components/arrows');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuickReplies = function (_Component) {
  _inherits(QuickReplies, _Component);

  function QuickReplies() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, QuickReplies);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = QuickReplies.__proto__ || Object.getPrototypeOf(QuickReplies)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      displayQuickReplies: _this.props.isLastMessage
    }, _this.doSendMessage = function (message) {
      _this.props.sendMessage(message);
      _this.setState({ displayQuickReplies: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(QuickReplies, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ displayQuickReplies: nextProps.isLastMessage });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          content = _props.content,
          style = _props.style;
      var displayQuickReplies = this.state.displayQuickReplies;
      var title = content.title,
          buttons = content.buttons;


      return _react2.default.createElement(
        'div',
        { className: 'RecastAppQuickReplies' },
        _react2.default.createElement(_Text2.default, { content: title, style: style }),
        displayQuickReplies && _react2.default.createElement(
          _reactSlick2.default,
          {
            arrows: true,
            variableWidth: true,
            speed: 200,
            infinite: false,
            draggable: false,
            slidesToScroll: 2,
            prevArrow: _react2.default.createElement(_arrows.PrevArrow, null),
            nextArrow: _react2.default.createElement(_arrows.NextArrow, null),
            className: 'RecastAppSlider RecastAppQuickReplies--slider'
          },
          buttons.map(function (b, i) {
            return _react2.default.createElement(
              'div',
              {
                key: i,
                className: 'RecastAppQuickReplies--button',
                onClick: function onClick() {
                  return _this2.doSendMessage({ type: 'text', content: b.value });
                },
                style: {
                  border: '1px solid ' + style.accentColor,
                  color: style.accentColor
                }
              },
              (0, _helpers.truncate)(b.title, 20)
            );
          })
        )
      );
    }
  }]);

  return QuickReplies;
}(_react.Component);

QuickReplies.propTypes = {
  style: _propTypes2.default.object,
  content: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func
};

exports.default = QuickReplies;