import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './assets/Components/Footer/Footer'
import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import Signup from './assets/Components/Login/Signup'
import Login from './assets/Components/Login/Login'
import Webinar from './assets/Components/Webinar/Webinar'
import Profile from './assets/Components/Profile/Profile';
import Jobs from './assets/Components/Jobs/Jobs'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="welcome-header">
                  <h1>Welcome to LinkUp.AI</h1>
                  <p>Connecting people with AI-powered precision.</p>
                </header>
                <Login />
              </>
            }
          />
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App