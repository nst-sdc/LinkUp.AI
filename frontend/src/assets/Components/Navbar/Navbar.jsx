import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../../../assets/Images/logo.png'
import searchIcon from '../../../assets/Images/search-iconW.png'

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

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => (prev === name ? null : name))
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
              <li>Webinars</li>
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
            <li>Profile</li>
        </ul>
        <div className='search-bar'>
            <input type="text" placeholder='Search...' />
            <img src={searchIcon} alt=''/>
        </div>
    </div>
  )
}

export default Navbar