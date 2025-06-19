import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../../../assets/Images/logo.png'
import searchIcon from '../../../assets/Images/search-iconW.png'
import ProfileForm from '../ProfileForm';

const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="transparent"
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
)

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null)
    // Demo: signed-in state (replace with real auth logic later)
    const [isSignedIn, setIsSignedIn] = useState(true)
    const [showProfileForm, setShowProfileForm] = useState(false)

    const toggleDropdown = (name) => {
      setActiveDropdown(prev => (prev === name ? null : name))
    }

    const handleProfileClick = () => {
      setShowProfileForm(true)
    }

    const closeProfileForm = () => {
      setShowProfileForm(false)
    }

    return (
      <div className='navbar'>
          <img src={logo} alt="LinkUp.AI Logo" className='logo' /> 
          <ul>
              <li>Feed</li>

              <li className='dropdown' onClick={() => toggleDropdown('opportunities')}>
                Opportunities <ArrowIcon />
                {activeDropdown === 'opportunities' && (
                  <ul className='dropdown-content'>
                    <li>Hackathons</li>
                    <li><Link to="/webinar">Webinars</Link></li>
                  </ul>
                )}
              </li>

              <li className='dropdown' onClick={() => toggleDropdown('ai')}>
                AI Assist <ArrowIcon />
                {activeDropdown === 'ai' && (
                  <ul className='dropdown-content'>
                    <li>Bio Generator</li>
                    <li>Resume Builder</li>
                    <li>Project Summarizer</li>
                  </ul>
                )}
              </li>

              <li className='dropdown' onClick={() => toggleDropdown('jobs')}>
                Jobs <ArrowIcon />
                {activeDropdown === 'jobs' && (
                  <ul className='dropdown-content'>
                    <li>Internships</li>
                    <li>Jobs</li>
                  </ul>
                )}
              </li>

              <li>Notifications</li>
              {/* Profile button only if signed in */}
              {isSignedIn && (
                <li>
                  <button onClick={handleProfileClick} style={{background: 'none', border: 'none', color: '#111827', cursor: 'pointer'}}>Profile</button>
                </li>
              )}
              {!isSignedIn && (
                <button style={{backgroundColor:'#111827',color:"white",borderRadius:'4px'}}>Sign in</button>
              )}
          </ul>
          <div className='search-bar'>
              <input type="text" placeholder='Search...' />
              <img src={searchIcon} alt='' />
          </div>
          {/* Modal for profile form */}
          {showProfileForm && (
            <div className="modal-overlay" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
              <div className="modal-content" style={{background:'#fff',padding:'2rem',borderRadius:'8px',minWidth:'300px',position:'relative'}}>
                <button onClick={closeProfileForm} style={{position:'absolute',top:10,right:10}}>X</button>
                {/* ProfileForm will go here */}
                <ProfileForm onClose={closeProfileForm} />
              </div>
            </div>
          )}
      </div>
    )
}

export default Navbar