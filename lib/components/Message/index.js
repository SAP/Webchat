'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Buttons = require('./Buttons');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _Picture = require('./Picture');

var _Picture2 = _interopRequireDefault(_Picture);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _QuickReplies = require('./QuickReplies');

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          isLastMessage = _props.isLastMessage,
          sendMessage = _props.sendMessage,
          preferences = _props.preferences,
          onImageLoaded = _props.onImageLoaded;
      var botPicture = preferences.botPicture,
          userPicture = preferences.userPicture,
          accentColor = preferences.accentColor,
          complementaryColor = preferences.complementaryColor,
          botMessageColor = preferences.botMessageColor,
          botMessageBackgroundColor = preferences.botMessageBackgroundColor;
      var displayIcon = message.displayIcon;
      var _message$attachment = message.attachment,
          type = _message$attachment.type,
          content = _message$attachment.content;

      var isBot = message.participant.isBot;

      var image = isBot ? botPicture : userPicture;
      var messageProps = {
        isBot: isBot,
        content: content,
        onImageLoaded: onImageLoaded,
        style: {
          color: isBot ? botMessageColor : complementaryColor,
          backgroundColor: isBot ? botMessageBackgroundColor : accentColor,
          accentColor: accentColor
        }
      };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('RecastAppMessage', { bot: isBot, user: !isBot }) },
        image && _react2.default.createElement('img', {
          className: (0, _classnames2.default)('RecastAppMessage--logo', { visible: displayIcon }),
          src: image,
          style: {}
        }),
        type === 'text' && _react2.default.createElement(_Text2.default, messageProps),
        type === 'picture' && _react2.default.createElement(_Picture2.default, messageProps),
        type === 'card' && _react2.default.createElement(_Card2.default, _extends({}, messageProps, { sendMessage: sendMessage })),
        ['carousel', 'carouselle'].includes(type) && _react2.default.createElement(_Carousel2.default, _extends({}, messageProps, { sendMessage: sendMessage })),
        type === 'list' && _react2.default.createElement(_List2.default, _extends({}, messageProps, { sendMessage: sendMessage })),
        type === 'buttons' && _react2.default.createElement(_Buttons2.default, _extends({}, messageProps, { sendMessage: sendMessage })),
        type === 'quickReplies' && _react2.default.createElement(_QuickReplies2.default, _extends({}, messageProps, { sendMessage: sendMessage, isLastMessage: isLastMessage }))
      );
    }
  }]);

  return Message;
}(_react.Component);

Message.propTypes = {
  message: _propTypes2.default.object,
  sendMessage: _propTypes2.default.func,
  preferences: _propTypes2.default.object,
  isLastMessage: _propTypes2.default.bool,
  onImageLoaded: _propTypes2.default.func
};

exports.default = Message;