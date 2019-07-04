import React, { useState, useEffect, useRef, useCallback } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';

import '../src/chatbot.min.css';

function ChatbotComponent ({ dialogue, closeChatbot }) {
  var ChatbotContent = useRef(null);

  const [messageHistory, setMessageHistory] = useState([]);
  const [hasOptions, setHasOptions] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  // const [countX, setCountX] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [userToDo, setUserToDo] = useState(null);
  const [robotToDo, setRobotToDo] = useState(null);

  useEffect(() => {
    // Handle user to do
    if (userToDo !== null) {
      setHasOptions(false);
      var messageObject = {
        type: 'message',
        src: 'user',
        say: userToDo.label
      };
      setMessageHistory([...messageHistory, messageObject]);
      setRobotToDo(userToDo);
      setUserToDo(null);
      // setCountX(x => x + 1);
    }
  }, [messageHistory, userToDo]);

  useEffect(() => {
    // handle robot to do
    function robotDo (botDo, robotToDo) {
      var say = botDo.say;

      if (botDo.say !== undefined &&
      typeof botDo.say === 'function' &&
      robotToDo.params !== undefined) {
        // say is a function
        // we will call say
        say = botDo.say(robotToDo.params);
      }

      var messageObject = {
        say: say,
        src: 'bot',
        type: 'message'
      };

      setMessageHistory([...messageHistory, messageObject]);

      if (botDo.onLoad !== undefined &&
      typeof botDo.onLoad === 'function') {
        botDo.onLoad();
      }

      if (botDo.options !== undefined) {
        setHasOptions(botDo.options);
      }

      setIsBotTyping(false);

      // setCountX(x => x + 1);

      if (ChatbotContent !== null &&
      ChatbotContent.current !== null) {
        ChatbotContent.current.scrollTo(0, ChatbotContent.current.scrollHeight);
      }
    }

    var isBotTypingTimeout = null;
    var robotDoTimeout = null;

    if (robotToDo !== null) {
      isBotTypingTimeout = setTimeout(() => {
        setIsBotTyping(true);
      }, 500);

      robotDoTimeout = setTimeout(() => {
        robotDo(dialogue[robotToDo.do], robotToDo);
        setRobotToDo(null);
      }, 1500);
    }

    return () => {
      clearTimeout(isBotTypingTimeout);
      clearTimeout(robotDoTimeout);
    };
  }, [dialogue, messageHistory, robotToDo]);

  useEffect(() => {
    if (hasBooted === false && messageHistory.length < 1) {
      // initial boot
      // addMessage('bot', );
      setRobotToDo({
        do: '_index'
      });
      setHasBooted(true);
    }

    if (ChatbotContent !== null) {
      // scroll down to latest content
      ChatbotContent.current.scrollTo(0, ChatbotContent.current.scrollHeight);
    }
  }, [ChatbotContent, hasBooted, messageHistory, setRobotToDo, setHasBooted]);

  console.log('hasOptions', hasOptions);

  var UserChatOptions = () => <div />;
  if (hasOptions !== false &&
    hasOptions.length > 0) {
    UserChatOptions = () => {
      return (<div>
        <Grow in={true} timeout={ { enter: 500 } }>
          <div className="chat-history-item">
            <div className="chat-message-options-label"><small>Choose Response</small></div>
            <div className="chat-message-options">
              {
                hasOptions.map((opt, index) => {
                  return <div key={index} onClick={() => {
                    setUserToDo(opt);
                  }} className="chat-message-option">{opt.label}</div>;
                })
              }
            </div>
          </div>
        </Grow>
      </div>);
    };
  }

  var BotTypingSpinner = () => <div />;
  if (isBotTyping === true) {
    BotTypingSpinner = () => (<div>
      <Grow in={true}>
        <div>
          <div className="is-typing-spinner">
            <div className="its-ball its-ball1"></div>
            <div className="its-ball its-ball2"></div>
            <div className="its-ball its-ball3"></div>
          </div>
        </div>
      </Grow>
    </div>);
  }

  return <React.Fragment>
    <div className="chatbot-header">
      <div className="chatbot-header-label">Chatbot <small>v0.1.0</small></div>
      <div><button className="chatbot-header-close" onClick={() => {
        closeChatbot();
      }}><CloseIcon /></button></div>
    </div>
    <div className="chatbot-content" ref={ChatbotContent}>
      <div>
        {
          messageHistory.map((obj, index) => {
            if (obj.type === 'message') {

              var ChatMessage = <div className={`chat-message chat-message-${obj.src}`}>
                {obj.say}
              </div>;
              if (obj.src === 'user') {
                ChatMessage = <div className="chat-push-right">
                  <div className={`chat-message chat-message-${obj.src}`}>
                    {obj.say}
                  </div>
                </div>;
              }

              return <div key={index}>
                <Grow in={true} timeout={ { enter: 500 } }>
                  <div className="chat-history-item">
                    {ChatMessage}
                  </div>
                </Grow>
              </div>;
            }
          })
        }
      </div>
      <React.Fragment>
        <UserChatOptions />
        <BotTypingSpinner />
      </React.Fragment>
    </div>
  </React.Fragment>;
}

export default function ({ TriggerComponent, dialogue, show, onHide }) {
  /*
  if (show === false) {
    return <div />;
  }
  */
  const [hasOpened, setHasOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    var t = null;

    if (isClosing === true) {
      t = setTimeout(() => {
        if (onHide !== undefined) {
          onHide();
        }
        setIsClosing(false);
      }, 300);
    }

    return () => {
      clearTimeout(t);
    };
  }, [isClosing, onHide]);

  useEffect(() => {
    if (hasOpened === false) {
      if (show === true) {
        setHasOpened(true);
      }
    }
  }, [show, hasOpened]);

  if (TriggerComponent === undefined) {
    TriggerComponent = <div />;
  }

  var chatbotWrapper = `chatbot-wrapper ${show ? 'show-chatbot' : ''}`;
  if (isClosing === true) {
    chatbotWrapper = 'chatbot-wrapper';
  }

  if (hasOpened === false) {
    return <React.Fragment>
      <div>
        {TriggerComponent}
      </div>
    </React.Fragment>;
  }

  return <React.Fragment>
    <div>
      {TriggerComponent}
    </div>
    <div className={chatbotWrapper}>
      <ChatbotComponent dialogue={dialogue} closeChatbot={() => {
        setIsClosing(true);
      }} />
    </div>
  </React.Fragment>;
}
