import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './assets/Components/Footer/Footer'
import Navbar from './assets/Components/Navbar/Navbar'
import Signup from './assets/Components/Login/Signup'
import Login from './assets/Components/Login/Login'
import Webinar from './assets/Components/Webinar/Webinar'
import Profile from './assets/Components/Profile/Profile';
import Home from './assets/Components/home_content/Homecontent';
import Hackathon from './assets/Components/hackathon/Hackathon';
import CareerBoost from './assets/Components/CareerBoost/CareerBoost';

import Jobs from './assets/Components/Jobs/Jobs'
import Internships from './assets/Components/Internships/Internships';


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              isSignedIn ? (
                <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
                  Welcome to your Profile
                </h2>
              ) : (
                <Home />
              )
            }
          />
          <Route path="/home" element={<Home />} />

          {/* Web pages */}
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/career-boost" element={<CareerBoost />} />
          <Route path="/internships" element={<Internships />} />


          {/* Auth */}
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

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
