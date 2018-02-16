'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _messages = require('selectors/messages');

var _messages2 = require('actions/messages');

var _Header = require('components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Live = require('components/Live');

var _Live2 = _interopRequireDefault(_Live);

var _Input = require('components/Input');

var _Input2 = _interopRequireDefault(_Input);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    token: state.conversation.token,
    chatId: state.conversation.chatId,
    channelId: state.conversation.channelId,
    conversationId: state.conversation.conversationId,
    lastMessageId: (0, _messages.getLastMessageId)(state),
    messages: state.messages
  };
}, {
  postMessage: _messages2.postMessage,
  pollMessages: _messages2.pollMessages
}), _dec(_class = function (_Component) {
  _inherits(Chat, _Component);

  function Chat() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Chat);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chat.__proto__ || Object.getPrototypeOf(Chat)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isPolling: false
    }, _this.sendMessage = function (attachment) {
      var _this$props = _this.props,
          token = _this$props.token,
          channelId = _this$props.channelId,
          chatId = _this$props.chatId;

      var payload = { message: { attachment: attachment }, chatId: chatId };

      _this.props.postMessage(channelId, token, payload).then(function () {
        if (!_this.state.isPolling) {
          _this.doMessagesPolling();
        }
      });
    }, _this.doMessagesPolling = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props2, token, channelId, conversationId, shouldPoll, index, lastMessageId, _ref3, waitTime;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({ isPolling: true });
              _this$props2 = _this.props, token = _this$props2.token, channelId = _this$props2.channelId, conversationId = _this$props2.conversationId;
              shouldPoll = true;
              index = 0;

            case 4:
              lastMessageId = _this.props.lastMessageId;
              _context.prev = 5;
              _context.next = 8;
              return _this.props.pollMessages(channelId, token, conversationId, lastMessageId);

            case 8:
              _ref3 = _context.sent;
              waitTime = _ref3.waitTime;

              shouldPoll = waitTime === 0;
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](5);

              shouldPoll = false;

            case 16:
              index++;

              if (!(!shouldPoll && index < 4)) {
                _context.next = 20;
                break;
              }

              _context.next = 20;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });

            case 20:
              if (shouldPoll || index < 4) {
                _context.next = 4;
                break;
              }

            case 21:

              _this.setState({ isPolling: false });

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[5, 13]]);
    })), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chat, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.doMessagesPolling();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          closeWebchat = _props.closeWebchat,
          messages = _props.messages,
          preferences = _props.preferences;


      return _react2.default.createElement(
        'div',
        { className: 'RecastAppChat' },
        _react2.default.createElement(_Header2.default, { closeWebchat: closeWebchat, preferences: preferences }),
        _react2.default.createElement(_Live2.default, { messages: messages, preferences: preferences, sendMessage: this.sendMessage }),
        _react2.default.createElement(
          'div',
          {
            className: 'RecastAppLive--slogan',
            style: { backgroundColor: preferences.backgroundColor }
          },
          'We run with Recast.AI'
        ),
        _react2.default.createElement(_Input2.default, { onSubmit: this.sendMessage })
      );
    }
  }]);

  return Chat;
}(_react.Component)) || _class);


Chat.propTypes = {
  postMessage: _propTypes2.default.func,
  closeWebchat: _propTypes2.default.func,
  pollMessages: _propTypes2.default.func,
  chatId: _propTypes2.default.string,
  channelId: _propTypes2.default.string,
  lastMessageId: _propTypes2.default.string,
  conversationId: _propTypes2.default.string,
  messages: _propTypes2.default.array,
  preferences: _propTypes2.default.object
};

exports.default = Chat;