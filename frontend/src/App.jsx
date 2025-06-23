import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './assets/Components/Navbar/Navbar';
import Footer from './assets/Components/Footer/Footer';
import Login from './assets/Components/Login/Login';
import Signup from './assets/Components/Login/Signup';
import Webinar from './assets/Components/Webinar/Webinar';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
                  Welcome to your Profile
                </h2>
              ) : (
                <>
                  <header className="welcome-header">
                    <h1>Welcome to LinkUp.AI</h1>
                    <p>Connecting people with AI-powered precision.</p>
                  </header>
                </>
              )
            }
          />

          <Route
            path="/login"
            element={
              isSignedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsSignedIn={setIsSignedIn} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              isSignedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Signup />
              )
            }
          />

          <Route path="/webinar" element={<Webinar />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;