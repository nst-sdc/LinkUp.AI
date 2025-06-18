import React from 'react';
import Footer from './assets/Components/Footer/Footer';
import './App.css';
import Navbar from './assets/Components/Navbar/Navbar';
import Signup from './assets/Components/Login/Signup'


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Signup/>
      <header className="welcome-header">
        <h1>Welcome to LinkUp.AI</h1>
        <p>Connecting people with AI-powered precision.</p>
      </header>
      
      <Footer/>
      
      

    </div>
  );
}

export default App;
