"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireWildcard(require("react"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Grow = _interopRequireDefault(require("@material-ui/core/Grow"));

require("../css/chatbot.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ChatbotComponent(_ref) {
  var dialogue = _ref.dialogue,
      closeChatbot = _ref.closeChatbot;
  var ChatbotContent = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      messageHistory = _useState2[0],
      setMessageHistory = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasOptions = _useState4[0],
      setHasOptions = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hasBooted = _useState6[0],
      setHasBooted = _useState6[1]; // const [countX, setCountX] = useState(0);


  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isBotTyping = _useState8[0],
      setIsBotTyping = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      userToDo = _useState10[0],
      setUserToDo = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      robotToDo = _useState12[0],
      setRobotToDo = _useState12[1];

  (0, _react.useEffect)(function () {
    // Handle user to do
    if (userToDo !== null) {
      setHasOptions(false);
      var messageObject = {
        type: 'message',
        src: 'user',
        say: userToDo.label
      };
      setMessageHistory([].concat(_toConsumableArray(messageHistory), [messageObject]));
      setRobotToDo(userToDo);
      setUserToDo(null); // setCountX(x => x + 1);
    }
  }, [messageHistory, userToDo]);
  (0, _react.useEffect)(function () {
    // handle robot to do
    function robotDo(botDo, robotToDo) {
      var say = botDo.say;

      if (botDo.say !== undefined && typeof botDo.say === 'function' && robotToDo.params !== undefined) {
        // say is a function
        // we will call say
        say = botDo.say(robotToDo.params);
      }

      var messageObject = {
        say: say,
        src: 'bot',
        type: 'message'
      };
      setMessageHistory([].concat(_toConsumableArray(messageHistory), [messageObject]));

      if (botDo.onLoad !== undefined && typeof botDo.onLoad === 'function') {
        botDo.onLoad();
      }

      if (botDo.options !== undefined) {
        setHasOptions(botDo.options);
      }

      setIsBotTyping(false); // setCountX(x => x + 1);

      if (ChatbotContent !== null && ChatbotContent.current !== null) {
        ChatbotContent.current.scrollTo(0, ChatbotContent.current.scrollHeight);
      }
    }

    var isBotTypingTimeout = null;
    var robotDoTimeout = null;

    if (robotToDo !== null) {
      isBotTypingTimeout = setTimeout(function () {
        setIsBotTyping(true);
      }, 500);
      robotDoTimeout = setTimeout(function () {
        robotDo(dialogue[robotToDo["do"]], robotToDo);
        setRobotToDo(null);
      }, 1500);
    }

    return function () {
      clearTimeout(isBotTypingTimeout);
      clearTimeout(robotDoTimeout);
    };
  }, [dialogue, messageHistory, robotToDo]);
  (0, _react.useEffect)(function () {
    if (hasBooted === false && messageHistory.length < 1) {
      // initial boot
      // addMessage('bot', );
      setRobotToDo({
        "do": '_index'
      });
      setHasBooted(true);
    }

    if (ChatbotContent !== null) {
      // scroll down to latest content
      ChatbotContent.current.scrollTo(0, ChatbotContent.current.scrollHeight);
    }
  }, [ChatbotContent, hasBooted, messageHistory, setRobotToDo, setHasBooted]);
  console.log('hasOptions', hasOptions);

  var UserChatOptions = function UserChatOptions() {
    return _react["default"].createElement("div", null);
  };

  if (hasOptions !== false && hasOptions.length > 0) {
    UserChatOptions = function UserChatOptions() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_Grow["default"], {
        "in": true,
        timeout: {
          enter: 500
        }
      }, _react["default"].createElement("div", {
        className: "chat-history-item"
      }, _react["default"].createElement("div", {
        className: "chat-message-options-label"
      }, _react["default"].createElement("small", null, "Choose Response")), _react["default"].createElement("div", {
        className: "chat-message-options"
      }, hasOptions.map(function (opt, index) {
        return _react["default"].createElement("div", {
          key: index,
          onClick: function onClick() {
            setUserToDo(opt);
          },
          className: "chat-message-option"
        }, opt.label);
      })))));
    };
  }

  var BotTypingSpinner = function BotTypingSpinner() {
    return _react["default"].createElement("div", null);
  };

  if (isBotTyping === true) {
    BotTypingSpinner = function BotTypingSpinner() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_Grow["default"], {
        "in": true
      }, _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "is-typing-spinner"
      }, _react["default"].createElement("div", {
        className: "its-ball its-ball1"
      }), _react["default"].createElement("div", {
        className: "its-ball its-ball2"
      }), _react["default"].createElement("div", {
        className: "its-ball its-ball3"
      })))));
    };
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "chatbot-header"
  }, _react["default"].createElement("div", {
    className: "chatbot-header-label"
  }, "Chatbot ", _react["default"].createElement("small", null, "v0.1.0")), _react["default"].createElement("div", null, _react["default"].createElement("button", {
    className: "chatbot-header-close",
    onClick: function onClick() {
      closeChatbot();
    }
  }, _react["default"].createElement(_Close["default"], null)))), _react["default"].createElement("div", {
    className: "chatbot-content",
    ref: ChatbotContent
  }, _react["default"].createElement("div", null, messageHistory.map(function (obj, index) {
    if (obj.type === 'message') {
      var ChatMessage = _react["default"].createElement("div", {
        className: "chat-message chat-message-".concat(obj.src)
      }, obj.say);

      if (obj.src === 'user') {
        ChatMessage = _react["default"].createElement("div", {
          className: "chat-push-right"
        }, _react["default"].createElement("div", {
          className: "chat-message chat-message-".concat(obj.src)
        }, obj.say));
      }

      return _react["default"].createElement("div", {
        key: index
      }, _react["default"].createElement(_Grow["default"], {
        "in": true,
        timeout: {
          enter: 500
        }
      }, _react["default"].createElement("div", {
        className: "chat-history-item"
      }, ChatMessage)));
    }

    return false;
  })), _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(UserChatOptions, null), _react["default"].createElement(BotTypingSpinner, null))));
}

function _default(_ref2) {
  var TriggerComponent = _ref2.TriggerComponent,
      dialogue = _ref2.dialogue,
      show = _ref2.show,
      onHide = _ref2.onHide;

  /*
  if (show === false) {
    return <div />;
  }
  */
  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      hasOpened = _useState14[0],
      setHasOpened = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isClosing = _useState16[0],
      setIsClosing = _useState16[1];

  (0, _react.useEffect)(function () {
    var t = null;

    if (isClosing === true) {
      t = setTimeout(function () {
        if (onHide !== undefined) {
          onHide();
        }

        setIsClosing(false);
      }, 300);
    }

    return function () {
      clearTimeout(t);
    };
  }, [isClosing, onHide]);
  (0, _react.useEffect)(function () {
    if (hasOpened === false) {
      if (show === true) {
        setHasOpened(true);
      }
    }
  }, [show, hasOpened]);

  if (TriggerComponent === undefined) {
    TriggerComponent = _react["default"].createElement("div", null);
  }

  var chatbotWrapper = "chatbot-wrapper ".concat(show ? 'show-chatbot' : '');

  if (isClosing === true) {
    chatbotWrapper = 'chatbot-wrapper';
  }

  if (hasOpened === false) {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, TriggerComponent));
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, TriggerComponent), _react["default"].createElement("div", {
    className: chatbotWrapper
  }, _react["default"].createElement(ChatbotComponent, {
    dialogue: dialogue,
    closeChatbot: function closeChatbot() {
      setIsClosing(true);
    }
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNoYXRib3RDb21wb25lbnQiLCJkaWFsb2d1ZSIsImNsb3NlQ2hhdGJvdCIsIkNoYXRib3RDb250ZW50IiwibWVzc2FnZUhpc3RvcnkiLCJzZXRNZXNzYWdlSGlzdG9yeSIsImhhc09wdGlvbnMiLCJzZXRIYXNPcHRpb25zIiwiaGFzQm9vdGVkIiwic2V0SGFzQm9vdGVkIiwiaXNCb3RUeXBpbmciLCJzZXRJc0JvdFR5cGluZyIsInVzZXJUb0RvIiwic2V0VXNlclRvRG8iLCJyb2JvdFRvRG8iLCJzZXRSb2JvdFRvRG8iLCJtZXNzYWdlT2JqZWN0IiwidHlwZSIsInNyYyIsInNheSIsImxhYmVsIiwicm9ib3REbyIsImJvdERvIiwidW5kZWZpbmVkIiwicGFyYW1zIiwib25Mb2FkIiwib3B0aW9ucyIsImN1cnJlbnQiLCJzY3JvbGxUbyIsInNjcm9sbEhlaWdodCIsImlzQm90VHlwaW5nVGltZW91dCIsInJvYm90RG9UaW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJVc2VyQ2hhdE9wdGlvbnMiLCJlbnRlciIsIm1hcCIsIm9wdCIsImluZGV4IiwiQm90VHlwaW5nU3Bpbm5lciIsIm9iaiIsIkNoYXRNZXNzYWdlIiwiVHJpZ2dlckNvbXBvbmVudCIsInNob3ciLCJvbkhpZGUiLCJoYXNPcGVuZWQiLCJzZXRIYXNPcGVuZWQiLCJpc0Nsb3NpbmciLCJzZXRJc0Nsb3NpbmciLCJ0IiwiY2hhdGJvdFdyYXBwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLGdCQUFULE9BQXVEO0FBQUEsTUFBMUJDLFFBQTBCLFFBQTFCQSxRQUEwQjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDckQsTUFBSUMsY0FBYyxHQUFHLG1C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QUFJLEtBQUssSUFBYixFQUFtQjtBQUNqQkcsUUFBQUEsWUFBWSxDQUFDLElBQUQsQ0FBWjtBQUNEO0FBQ0Y7QUFDRixHQU5ELEVBTUcsQ0FBQ0gsSUFBRCxFQUFPRSxTQUFQLENBTkg7O0FBUUEsTUFBSUgsZ0JBQWdCLEtBQUt0QixTQUF6QixFQUFvQztBQUNsQ3NCLElBQUFBLGdCQUFnQixHQUFHLDRDQUFuQjtBQUNEOztBQUVELE1BQUlRLGNBQWMsNkJBQXNCUCxJQUFJLEdBQUcsY0FBSCxHQUFvQixFQUE5QyxDQUFsQjs7QUFDQSxNQUFJSSxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEJHLElBQUFBLGNBQWMsR0FBRyxpQkFBakI7QUFDRDs7QUFFRCxNQUFJTCxTQUFTLEtBQUssS0FBbEIsRUFBeUI7QUFDdkIsV0FBTyxnQ0FBQyxpQkFBRCxDQUFPLFFBQVAsUUFDTCw2Q0FDR0gsZ0JBREgsQ0FESyxDQUFQO0FBS0Q7O0FBRUQsU0FBTyxnQ0FBQyxpQkFBRCxDQUFPLFFBQVAsUUFDTCw2Q0FDR0EsZ0JBREgsQ0FESyxFQUlMO0FBQUssSUFBQSxTQUFTLEVBQUVRO0FBQWhCLEtBQ0UsZ0NBQUMsZ0JBQUQ7QUFBa0IsSUFBQSxRQUFRLEVBQUVwRCxRQUE1QjtBQUFzQyxJQUFBLFlBQVksRUFBRSx3QkFBTTtBQUN4RGtELE1BQUFBLFlBQVksQ0FBQyxJQUFELENBQVo7QUFDRDtBQUZELElBREYsQ0FKSyxDQUFQO0FBVUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2UnO1xyXG5pbXBvcnQgR3JvdyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9Hcm93JztcclxuXHJcbmltcG9ydCAnLi4vY3NzL2NoYXRib3QubWluLmNzcyc7XHJcblxyXG5mdW5jdGlvbiBDaGF0Ym90Q29tcG9uZW50ICh7IGRpYWxvZ3VlLCBjbG9zZUNoYXRib3QgfSkge1xyXG4gIHZhciBDaGF0Ym90Q29udGVudCA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgW21lc3NhZ2VIaXN0b3J5LCBzZXRNZXNzYWdlSGlzdG9yeV0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2hhc09wdGlvbnMsIHNldEhhc09wdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtoYXNCb290ZWQsIHNldEhhc0Jvb3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgLy8gY29uc3QgW2NvdW50WCwgc2V0Q291bnRYXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtpc0JvdFR5cGluZywgc2V0SXNCb3RUeXBpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBbdXNlclRvRG8sIHNldFVzZXJUb0RvXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtyb2JvdFRvRG8sIHNldFJvYm90VG9Eb10gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIEhhbmRsZSB1c2VyIHRvIGRvXHJcbiAgICBpZiAodXNlclRvRG8gIT09IG51bGwpIHtcclxuICAgICAgc2V0SGFzT3B0aW9ucyhmYWxzZSk7XHJcbiAgICAgIHZhciBtZXNzYWdlT2JqZWN0ID0ge1xyXG4gICAgICAgIHR5cGU6ICdtZXNzYWdlJyxcclxuICAgICAgICBzcmM6ICd1c2VyJyxcclxuICAgICAgICBzYXk6IHVzZXJUb0RvLmxhYmVsXHJcbiAgICAgIH07XHJcbiAgICAgIHNldE1lc3NhZ2VIaXN0b3J5KFsuLi5tZXNzYWdlSGlzdG9yeSwgbWVzc2FnZU9iamVjdF0pO1xyXG4gICAgICBzZXRSb2JvdFRvRG8odXNlclRvRG8pO1xyXG4gICAgICBzZXRVc2VyVG9EbyhudWxsKTtcclxuICAgICAgLy8gc2V0Q291bnRYKHggPT4geCArIDEpO1xyXG4gICAgfVxyXG4gIH0sIFttZXNzYWdlSGlzdG9yeSwgdXNlclRvRG9dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIGhhbmRsZSByb2JvdCB0byBkb1xyXG4gICAgZnVuY3Rpb24gcm9ib3REbyAoYm90RG8sIHJvYm90VG9Ebykge1xyXG4gICAgICB2YXIgc2F5ID0gYm90RG8uc2F5O1xyXG5cclxuICAgICAgaWYgKGJvdERvLnNheSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHR5cGVvZiBib3REby5zYXkgPT09ICdmdW5jdGlvbicgJiZcclxuICAgICAgcm9ib3RUb0RvLnBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gc2F5IGlzIGEgZnVuY3Rpb25cclxuICAgICAgICAvLyB3ZSB3aWxsIGNhbGwgc2F5XHJcbiAgICAgICAgc2F5ID0gYm90RG8uc2F5KHJvYm90VG9Eby5wYXJhbXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbWVzc2FnZU9iamVjdCA9IHtcclxuICAgICAgICBzYXk6IHNheSxcclxuICAgICAgICBzcmM6ICdib3QnLFxyXG4gICAgICAgIHR5cGU6ICdtZXNzYWdlJ1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgc2V0TWVzc2FnZUhpc3RvcnkoWy4uLm1lc3NhZ2VIaXN0b3J5LCBtZXNzYWdlT2JqZWN0XSk7XHJcblxyXG4gICAgICBpZiAoYm90RG8ub25Mb2FkICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgdHlwZW9mIGJvdERvLm9uTG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGJvdERvLm9uTG9hZCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYm90RG8ub3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc2V0SGFzT3B0aW9ucyhib3REby5vcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNCb3RUeXBpbmcoZmFsc2UpO1xyXG5cclxuICAgICAgLy8gc2V0Q291bnRYKHggPT4geCArIDEpO1xyXG5cclxuICAgICAgaWYgKENoYXRib3RDb250ZW50ICE9PSBudWxsICYmXHJcbiAgICAgIENoYXRib3RDb250ZW50LmN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBDaGF0Ym90Q29udGVudC5jdXJyZW50LnNjcm9sbFRvKDAsIENoYXRib3RDb250ZW50LmN1cnJlbnQuc2Nyb2xsSGVpZ2h0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0JvdFR5cGluZ1RpbWVvdXQgPSBudWxsO1xyXG4gICAgdmFyIHJvYm90RG9UaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAocm9ib3RUb0RvICE9PSBudWxsKSB7XHJcbiAgICAgIGlzQm90VHlwaW5nVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNldElzQm90VHlwaW5nKHRydWUpO1xyXG4gICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgcm9ib3REb1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByb2JvdERvKGRpYWxvZ3VlW3JvYm90VG9Eby5kb10sIHJvYm90VG9Ebyk7XHJcbiAgICAgICAgc2V0Um9ib3RUb0RvKG51bGwpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQoaXNCb3RUeXBpbmdUaW1lb3V0KTtcclxuICAgICAgY2xlYXJUaW1lb3V0KHJvYm90RG9UaW1lb3V0KTtcclxuICAgIH07XHJcbiAgfSwgW2RpYWxvZ3VlLCBtZXNzYWdlSGlzdG9yeSwgcm9ib3RUb0RvXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaGFzQm9vdGVkID09PSBmYWxzZSAmJiBtZXNzYWdlSGlzdG9yeS5sZW5ndGggPCAxKSB7XHJcbiAgICAgIC8vIGluaXRpYWwgYm9vdFxyXG4gICAgICAvLyBhZGRNZXNzYWdlKCdib3QnLCApO1xyXG4gICAgICBzZXRSb2JvdFRvRG8oe1xyXG4gICAgICAgIGRvOiAnX2luZGV4J1xyXG4gICAgICB9KTtcclxuICAgICAgc2V0SGFzQm9vdGVkKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChDaGF0Ym90Q29udGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAvLyBzY3JvbGwgZG93biB0byBsYXRlc3QgY29udGVudFxyXG4gICAgICBDaGF0Ym90Q29udGVudC5jdXJyZW50LnNjcm9sbFRvKDAsIENoYXRib3RDb250ZW50LmN1cnJlbnQuc2Nyb2xsSGVpZ2h0KTtcclxuICAgIH1cclxuICB9LCBbQ2hhdGJvdENvbnRlbnQsIGhhc0Jvb3RlZCwgbWVzc2FnZUhpc3RvcnksIHNldFJvYm90VG9Ebywgc2V0SGFzQm9vdGVkXSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdoYXNPcHRpb25zJywgaGFzT3B0aW9ucyk7XHJcblxyXG4gIHZhciBVc2VyQ2hhdE9wdGlvbnMgPSAoKSA9PiA8ZGl2IC8+O1xyXG4gIGlmIChoYXNPcHRpb25zICE9PSBmYWxzZSAmJlxyXG4gICAgaGFzT3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICBVc2VyQ2hhdE9wdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgIHJldHVybiAoPGRpdj5cclxuICAgICAgICA8R3JvdyBpbj17dHJ1ZX0gdGltZW91dD17IHsgZW50ZXI6IDUwMCB9IH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtaGlzdG9yeS1pdGVtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1tZXNzYWdlLW9wdGlvbnMtbGFiZWxcIj48c21hbGw+Q2hvb3NlIFJlc3BvbnNlPC9zbWFsbD48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LW1lc3NhZ2Utb3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhhc09wdGlvbnMubWFwKChvcHQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRVc2VyVG9EbyhvcHQpO1xyXG4gICAgICAgICAgICAgICAgICB9fSBjbGFzc05hbWU9XCJjaGF0LW1lc3NhZ2Utb3B0aW9uXCI+e29wdC5sYWJlbH08L2Rpdj47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0dyb3c+XHJcbiAgICAgIDwvZGl2Pik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdmFyIEJvdFR5cGluZ1NwaW5uZXIgPSAoKSA9PiA8ZGl2IC8+O1xyXG4gIGlmIChpc0JvdFR5cGluZyA9PT0gdHJ1ZSkge1xyXG4gICAgQm90VHlwaW5nU3Bpbm5lciA9ICgpID0+ICg8ZGl2PlxyXG4gICAgICA8R3JvdyBpbj17dHJ1ZX0+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXMtdHlwaW5nLXNwaW5uZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdHMtYmFsbCBpdHMtYmFsbDFcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdHMtYmFsbCBpdHMtYmFsbDJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdHMtYmFsbCBpdHMtYmFsbDNcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0dyb3c+XHJcbiAgICA8L2Rpdj4pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIDxSZWFjdC5GcmFnbWVudD5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdGJvdC1oZWFkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0Ym90LWhlYWRlci1sYWJlbFwiPkNoYXRib3QgPHNtYWxsPnYwLjEuMDwvc21hbGw+PC9kaXY+XHJcbiAgICAgIDxkaXY+PGJ1dHRvbiBjbGFzc05hbWU9XCJjaGF0Ym90LWhlYWRlci1jbG9zZVwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICBjbG9zZUNoYXRib3QoKTtcclxuICAgICAgfX0+PENsb3NlSWNvbiAvPjwvYnV0dG9uPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXRib3QtY29udGVudFwiIHJlZj17Q2hhdGJvdENvbnRlbnR9PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1lc3NhZ2VIaXN0b3J5Lm1hcCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09ICdtZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgIHZhciBDaGF0TWVzc2FnZSA9IDxkaXYgY2xhc3NOYW1lPXtgY2hhdC1tZXNzYWdlIGNoYXQtbWVzc2FnZS0ke29iai5zcmN9YH0+XHJcbiAgICAgICAgICAgICAgICB7b2JqLnNheX1cclxuICAgICAgICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgICAgICAgaWYgKG9iai5zcmMgPT09ICd1c2VyJykge1xyXG4gICAgICAgICAgICAgICAgQ2hhdE1lc3NhZ2UgPSA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtcHVzaC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNoYXQtbWVzc2FnZSBjaGF0LW1lc3NhZ2UtJHtvYmouc3JjfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtvYmouc2F5fVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3cgaW49e3RydWV9IHRpbWVvdXQ9eyB7IGVudGVyOiA1MDAgfSB9PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtaGlzdG9yeS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge0NoYXRNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvR3Jvdz5cclxuICAgICAgICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgPFVzZXJDaGF0T3B0aW9ucyAvPlxyXG4gICAgICAgIDxCb3RUeXBpbmdTcGlubmVyIC8+XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L1JlYWN0LkZyYWdtZW50PjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgVHJpZ2dlckNvbXBvbmVudCwgZGlhbG9ndWUsIHNob3csIG9uSGlkZSB9KSB7XHJcbiAgLypcclxuICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiA8ZGl2IC8+O1xyXG4gIH1cclxuICAqL1xyXG4gIGNvbnN0IFtoYXNPcGVuZWQsIHNldEhhc09wZW5lZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2lzQ2xvc2luZywgc2V0SXNDbG9zaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZhciB0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoaXNDbG9zaW5nID09PSB0cnVlKSB7XHJcbiAgICAgIHQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAob25IaWRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIG9uSGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJc0Nsb3NpbmcoZmFsc2UpO1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0KTtcclxuICAgIH07XHJcbiAgfSwgW2lzQ2xvc2luZywgb25IaWRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaGFzT3BlbmVkID09PSBmYWxzZSkge1xyXG4gICAgICBpZiAoc2hvdyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNldEhhc09wZW5lZCh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFtzaG93LCBoYXNPcGVuZWRdKTtcclxuXHJcbiAgaWYgKFRyaWdnZXJDb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgVHJpZ2dlckNvbXBvbmVudCA9IDxkaXYgLz47XHJcbiAgfVxyXG5cclxuICB2YXIgY2hhdGJvdFdyYXBwZXIgPSBgY2hhdGJvdC13cmFwcGVyICR7c2hvdyA/ICdzaG93LWNoYXRib3QnIDogJyd9YDtcclxuICBpZiAoaXNDbG9zaW5nID09PSB0cnVlKSB7XHJcbiAgICBjaGF0Ym90V3JhcHBlciA9ICdjaGF0Ym90LXdyYXBwZXInO1xyXG4gIH1cclxuXHJcbiAgaWYgKGhhc09wZW5lZCA9PT0gZmFsc2UpIHtcclxuICAgIHJldHVybiA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAge1RyaWdnZXJDb21wb25lbnR9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9SZWFjdC5GcmFnbWVudD47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgPGRpdj5cclxuICAgICAge1RyaWdnZXJDb21wb25lbnR9XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjaGF0Ym90V3JhcHBlcn0+XHJcbiAgICAgIDxDaGF0Ym90Q29tcG9uZW50IGRpYWxvZ3VlPXtkaWFsb2d1ZX0gY2xvc2VDaGF0Ym90PXsoKSA9PiB7XHJcbiAgICAgICAgc2V0SXNDbG9zaW5nKHRydWUpO1xyXG4gICAgICB9fSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9SZWFjdC5GcmFnbWVudD47XHJcbn1cclxuIl19