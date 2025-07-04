import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/Images/logo.png';
import searchIcon from '../../../assets/Images/search-iconW.png';
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";


const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="arrow-icon"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#16191d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = ({ isSignedIn, setIsSignedIn, profileData }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleSignOut = async() => {
    setIsSignedIn(false);
    navigate('/home');
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="LinkUp.AI Logo" className="logo" />

      <ul>
        <li><Link to="/home">Home</Link></li>

        <li
          className={`dropdown ${activeDropdown === 'opportunities' ? 'active' : ''}`}
          onClick={() => toggleDropdown('opportunities')}
        >
          Opportunities <ArrowIcon />
          {activeDropdown === 'opportunities' && (
            <ul className="dropdown-content">
              <li><Link to="/hackathon">Hackathons</Link></li>
              <li><Link to="/webinar">Webinars</Link></li>
            </ul>
          )}
        </li>

        <li
          className={`dropdown ${activeDropdown === 'ai' ? 'active' : ''}`}
          onClick={() => toggleDropdown('ai')}
        >
          AI Assist <ArrowIcon />
          {activeDropdown === 'ai' && (
            <ul className="dropdown-content">
              <li><Link to="/bio-generator">Bio Generator</Link></li>
              <li>
                <Link to="/resume-builder" state={{ profileData: profileData || {} }}>
                  Resume Builder
                </Link>
              </li>
              <li onClick={() => navigate('/career-boost')}>Career Boost</li>
            </ul>
          )}
        </li>

        <li
          className={`dropdown ${activeDropdown === 'jobs' ? 'active' : ''}`}
          onClick={() => toggleDropdown('jobs')}
        >
          Jobs <ArrowIcon />
          {activeDropdown === 'jobs' && (
            <ul className="dropdown-content">
              <li><Link to="/Jobs">Jobs</Link></li>
              <li><Link to="/internships">Internships</Link></li>
            </ul>
          )}
        </li>

        {/* Replaced Notifications with Chat */}
        <li><Link to="/messages" className="chat-link">💬 messaging</Link></li>

        <li className="auth-buttons">
          {isSignedIn ? (
            <div className="auth-buttons">
              <Link to="/profile" className="profile-link">👤 Profile</Link>
              <button className="nav-btn signout" onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="nav-btn login" onClick={() => navigate('/login')}>Login</button>
              <button className="nav-btn signup" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;