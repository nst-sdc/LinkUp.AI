import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Footer from './assets/Components/Footer/Footer';
import Navbar from './assets/Components/Navbar/Navbar';
import Signup from './assets/Components/Login/Signup';
import Login from './assets/Components/Login/Login';
import Webinar from './assets/Components/Webinar/Webinar';
import Profile from './assets/Components/Profile/Profile';
import Home from './assets/Components/home_content/Homecontent';
import Hackathon from './assets/Components/hackathon/Hackathon';
import CareerBoost from './assets/Components/CareerBoost/CareerBoost';
import Jobs from './assets/Components/Jobs/Jobs';
import Internships from './assets/Components/Internships/Internships';
import BioGenerator from './assets/Components/BioGenerator/BioGenerator';
import ResumeBuilder from './assets/Components/ResumeBuilder/ResumeBuilder';
import Post from './assets/Components/Post/Post';
import TeamForm from './assets/Components/hackathon/teamform';

import CreateEventForm from './assets/Components/Webinar/EventForm';
import Chat from './assets/Components/Chat/Chat'

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); 
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user); 
      setAuthChecked(true); 
    });

    return () => unsubscribe();
  }, []);

  const updateProfileData = (data) => {
    setProfileData(data);
  };

  
  if (!authChecked) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} profileData={profileData} />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Web pages */}
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile onSubmit={updateProfileData} />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/career-boost" element={<CareerBoost />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/bio-generator" element={<BioGenerator />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/home" element={<Home />} />
          <Route path="/teamform" element={<TeamForm />} />

          <Route path='/eventform' element={<CreateEventForm/>}/>

          <Route path="/chat" element={<Chat />} />

          <Route path="/post" element={<Post profileData={profileData} onBack={() => window.history.back()} />} />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              isSignedIn ? <Navigate to="/" replace /> : <Login setIsSignedIn={setIsSignedIn} />
            }
          />
          <Route
            path="/signup"
            element={
              isSignedIn ? <Navigate to="/" replace /> : <Signup />
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
