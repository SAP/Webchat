'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduceRight = require('lodash/reduceRight');

var _reduceRight2 = _interopRequireDefault(_reduceRight);

var _Message = require('components/Message');

var _Message2 = _interopRequireDefault(_Message);

var _isTyping = require('components/Message/isTyping');

var _isTyping2 = _interopRequireDefault(_isTyping);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Live = function (_Component) {
  _inherits(Live, _Component);

  function Live() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Live);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Live.__proto__ || Object.getPrototypeOf(Live)).call.apply(_ref, [this].concat(args))), _this), _this.onImageLoaded = function () {
      var container = document.querySelector('.RecastAppLive');
      container.scrollTop = container.scrollHeight;
    }, _this.fmtMessages = function () {
      var messages = (0, _reduceRight2.default)(_this.props.messages, function (acc, cur) {
        var nextMessage = acc[0];

        cur.displayIcon = !nextMessage || nextMessage.participant.isBot !== cur.participant.isBot;

        acc.unshift(cur);
        return acc;
      }, []);

      return messages;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Live, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var container = document.querySelector('.RecastAppLive');
      container.scrollTop = container.scrollHeight;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.messages.length !== this.props.messages.length) {
        var container = document.querySelector('.RecastAppLive');
        container.scrollTop = container.scrollHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          messages = _props.messages,
          sendMessage = _props.sendMessage,
          preferences = _props.preferences;

      var lastMessage = messages.slice(-1)[0];

      return _react2.default.createElement(
        'div',
        { className: 'RecastAppLive', style: { backgroundColor: preferences.backgroundColor } },
        _react2.default.createElement(
          'div',
          { className: 'RecastAppLive--message-container' },
          this.fmtMessages().map(function (message, index) {
            return _react2.default.createElement(_Message2.default, {
              key: message.id,
              message: message,
              sendMessage: sendMessage,
              preferences: preferences,
              onImageLoaded: _this2.onImageLoaded,
              isLastMessage: messages.length === index + 1
            });
          }),
          lastMessage && lastMessage.participant.isBot === false && _react2.default.createElement(_isTyping2.default, { image: preferences.botPicture })
        )
      );
    }
  }]);

  return Live;
}(_react.Component);

Live.propTypes = {
  messages: _propTypes2.default.array,
  sendMessage: _propTypes2.default.func,
  preferences: _propTypes2.default.object
};

exports.default = Live;