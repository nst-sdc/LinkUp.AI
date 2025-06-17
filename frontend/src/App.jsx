import React from 'react';
import './App.css';
import Navbar from './assets/Components/Navbar/Navbar';


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <header className="welcome-header">
        <h1>Welcome to LinkUp.AI</h1>
        <p>Connecting people with AI-powered precision.</p>
      </header>
    </div>
  );
}

export default App;
