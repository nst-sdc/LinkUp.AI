import React from 'react'
import "./Hackathonstyle.css"
import gdsc from "../logo/gdsc.jpg"
import sih from "../logo/sih.png"
import eth from "../logo/ethglobal.png"
import main1 from "../logo/main1.png"
import main2 from "../logo/main2.png"
import Navbar from "../Navbar/Navbar"

const Hackathon = () => {
  return (
    <>
    
    <div id = "container">
        <img src={main1} alt="hackathon"></img>
        <h1>Hackathon & Bootcamp</h1>
        <p>Embark on your hackathon journey — where ideas ignite, skills grow, and innovation begins.</p>
    </div>
    <div id = "know">
        <img src={main2} alt='search-image'/>
        <h1>Know your Hackathon</h1>
        <div className='hackathon-search-bar'>
            <input type="text" placeholder='Search...' />
        </div>
    </div>
    <h1 id = "text">Top Hackathon to participate.</h1>
    <div id = "tophack">
    <div>
      <img src={gdsc} alt=""></img>
      <h4>SIH</h4>
    </div>
    <div>
      <img src={sih} alt=""></img>
      <h4>GDSC</h4>
    </div>
    <div>
      <img src={eth} alt=""></img>
      <h4>ETHglobal</h4>
    </div>
    </div>

    </>
  )
}

export default Hackathon;