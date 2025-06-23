import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './assets/Components/Footer/Footer';
import './App.css';
import Navbar from './assets/Components/Navbar/Navbar';
import Signup from './assets/Components/Login/Signup';
import Login from './assets/Components/Login/Login';
import Webinar from './assets/Components/Webinar/Webinar';
import Home from './assets/Components/home_content/Homecontent';
import Hackathon from './assets/Components/hackathon/Hackathon';

function App() {
  return (
    <Router>
    <div className="app-container">
      <Navbar />

   
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/webinar" element={<Webinar />} />
      <Route path="/hackathon" element={<Hackathon />} />
      </Routes>

      <Footer />
    </div>
  </Router>
  );
}

export default App;