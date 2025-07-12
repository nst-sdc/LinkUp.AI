import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css'
const socket = io('https://linkup-ai.onrender.com/');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [activeConversation, setActiveConversation] = useState(null);
  const [privateMessages, setPrivateMessages] = useState({});
  const [showUserList, setShowUserList] = useState(false);

  const messagesEndRef = useRef(null);

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

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    
    socket.on('private message', (msg) => {
      const conversationId = msg.isSelf ? msg.recipientId : msg.senderId;
      setPrivateMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), msg]
      }));
    });

    return () => {
      socket.off('message');
      socket.off('userList');
      socket.off('private message'); 
    };
  }, []);

  
  const requestUserList = () => {
    socket.emit('request users');
    setShowUserList(!showUserList);
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

  if (!localStorage.getItem('username')) {
    return (
      <div className="username-container">
        <form onSubmit={handleUsernameSubmit}>
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
    );
  }

  return (
    <div className="chat-container">
      <button onClick={requestUserList} className="user-list-toggle">
        {showUserList ? 'Hide Users' : 'Show Users'}
      </button>

      {showUserList && (
        <div className="users-list">
          <h3>Online Users ({users.length})</h3>
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
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="chat-box">
        <div className="messages">
          {activeConversation ? (
            
            privateMessages[activeConversation]?.map((msg, index) => (
              <div key={index} className={`message ${msg.isSelf ? 'self' : 'other'}`}>
                <span className="message-time">{msg.time}</span>
                <span className="message-user">{msg.sender}:</span>
                <span className="message-text">{msg.message}</span>
              </div>
            ))
          ) : (
            
            messages.map((msg, index) => (
              <div key={index} className="message">
                <span className="message-time">{msg.time}</span>
                <span className="message-user">{msg.user}:</span>
                <span className="message-text">{msg.text}</span>
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
            placeholder={activeConversation ? "Type a private message..." : "Type a message..."}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;