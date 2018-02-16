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

var _Chat = require('containers/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Expander = require('components/Expander');

var _Expander2 = _interopRequireDefault(_Expander);

var _conversation = require('actions/conversation');

var _helpers = require('helpers');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (_dec = (0, _reactRedux.connect)(null, {
  setCredentials: _conversation.setCredentials,
  createConversation: _conversation.createConversation
}), _dec(_class = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.toggleChat = function () {
      _this.setState({ expanded: !_this.state.expanded });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          channelId = _props.channelId,
          token = _props.token,
          preferences = _props.preferences;

      var credentials = (0, _helpers.getCredentialsFromCookie)();
      var payload = { channelId: channelId, token: token };

      if (credentials) {
        Object.assign(payload, credentials);
      } else {
        this.props.createConversation(channelId, token).then(function (_ref2) {
          var id = _ref2.id,
              chatId = _ref2.chatId;
          return (0, _helpers.storeCredentialsInCookie)(chatId, id, preferences.conversationTimeToLive);
        });
      }

      this.props.setCredentials(payload);
    }
  }, {
    key: 'render',
    value: function render() {
      var preferences = this.props.preferences;
      var expanded = this.state.expanded;


      return _react2.default.createElement(
        'div',
        { className: 'RecastApp' },
        _react2.default.createElement('link', {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        }),
        _react2.default.createElement('link', {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        }),
        !expanded && _react2.default.createElement(_Expander2.default, { onClick: this.toggleChat, preferences: preferences }),
        expanded && _react2.default.createElement(_Chat2.default, { closeWebchat: this.toggleChat, preferences: preferences })
      );
    }
  }]);

  return App;
}(_react.Component)) || _class);


App.propTypes = {
  token: _propTypes2.default.string.isRequired,
  channelId: _propTypes2.default.string.isRequired,
  preferences: _propTypes2.default.object.isRequired
};

exports.default = App;