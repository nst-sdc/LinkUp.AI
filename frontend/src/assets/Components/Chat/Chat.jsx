import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css'
const socket = io('http://localhost:4000');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [activeConversation, setActiveConversation] = useState(null);
  const [privateMessages, setPrivateMessages] = useState({});
  const [showUserList, setShowUserList] = useState(false);

  const messagesEndRef = useRef(null);

  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, privateMessages, activeConversation]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      socket.emit('join', storedUsername);
    }
  }, []);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    
    const userListHandler = (userList) => {
      console.log("Received Users:", userList);
      setUsers(userList);
    };

    socket.on('userList', userListHandler);

    socket.on('private message', (msg) => {
      const conversationId = msg.isSelf ? msg.recipientId : msg.senderId;
      setPrivateMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), msg]
      }));
    });

    return () => {
      socket.off('message');
      socket.off('userList', userListHandler);
      socket.off('private message'); 
    };
  }, []);

  const requestUserList = () => {
    console.log("Requesting user list");
    socket.emit('request users');
    setShowUserList(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (activeConversation) {
       
        socket.emit('private message', {
          recipientId: activeConversation,
          message: message
        });
      } else {
        
        socket.emit('sendMessage', message);
      }
      setMessage('');
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      socket.emit('join', username);
    }
  };

  
  const getActiveConversationUsername = () => {
    if (!activeConversation) return null;
    const user = users.find(u => u.id === activeConversation);
    return user?.username || 'Unknown User';
  };

  if (!localStorage.getItem('username')) {
    return (
      <div className="username-container">
        <div className="username-box">
          <h2>Join Chat</h2>
          <form onSubmit={handleUsernameSubmit} className="username-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <button onClick={requestUserList} className="user-list-toggle">
        {showUserList ? 'Hide Users' : 'Show Users'}
      </button>

      {showUserList && (
        <div className="users-list">
          <div className="users-list-header">
            <h3>Online Users ({users.length})</h3>
            <button 
              onClick={() => setShowUserList(false)}
              className="close-button"
            >
              ×
            </button>
          </div>
          <ul>
            {users.map((user) => (
              <li 
                key={user.id}
                onClick={() => {
                  setActiveConversation(user.id);
                  setShowUserList(false);
                }}
                className={activeConversation === user.id ? 'active' : ''}
              >
                <div className="user-status"></div>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="chat-box">
        {activeConversation && (
          <div className="chat-header">
            <h3 className="chat-title">
              Private chat with {getActiveConversationUsername()}
            </h3>
            <button 
              onClick={() => setActiveConversation(null)}
              className="back-button"
            >
              ← Back to Public Chat
            </button>
          </div>
        )}
        
        <div className="messages">
          {activeConversation ? (
            
            privateMessages[activeConversation]?.map((msg, index) => (
              <div key={index} className={`message ${msg.isSelf ? 'message-self' : 'message-other'}`}>
                <div className="message-time">{msg.time}</div>
                <div className="message-user">{msg.sender}:</div>
                <div className="message-text">{msg.message}</div>
              </div>
            ))
          ) : (
            
            messages.map((msg, index) => (
              <div key={index} className="message">
                <div className="message-time">{msg.time}</div>
                <div className="message-user">{msg.user}:</div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              activeConversation 
                ? `Type a private message to ${getActiveConversationUsername()}...` 
                : "Type a message..."
            }
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;