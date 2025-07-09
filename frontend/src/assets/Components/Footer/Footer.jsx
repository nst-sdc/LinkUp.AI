import React from 'react'
import './Footer.css'
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
return (
<div className='footer'>
<div className='in_footer section_padding' >
<div className='footer_links'>
    {/* for the every section there will be the new page and that page link we will add when we will make there page till then leave it as it is  */}
    <div className='footer_links1'>
        <h4>Company</h4>
        <a href='/home'><p>Home</p></a>  
        <a href='/hackathon'><p>Hackathon</p></a>
        <a href='/webinar'><p>Webinar</p></a>
        <p></p>
        <p></p>
    </div>

    <div className='footer_links1'>
        <h4>AI Assist</h4>
        <a href='/bio-generator'><p>Bio Generator</p></a>  
        <a href='/resume-builder'><p>Resume Builder</p></a>
        <a href='/career-boost'><p>Career Boost</p></a>  
    </div>

    <div className='footer_links1'>
        <h4>More</h4>
        <a href='/#about'><p>About Us</p></a>  
        <a href='/#features'><p>Core Features</p></a>
        <a href='/#news'><p>Latest Tech News</p></a>  
    </div>


    {/* the below section is for social media accounds for which we have to add the images we will do it letter */}


<hr></hr>


<div className='footer-below'>
        <div className='copyright'>
        <p>@ 2025 LinkUp.AI . All right reserved. </p>
        </div>
        <div className='footer-below-links '>
        <span><a href='/terms'><div><p>Terms and Conditions</p></div></a></span>
        <span><a href='/terms'><div><p>Privacy </p></div></a></span>
        <span><a href='/terms'><div><p>Security</p></div></a></span>
        <span><a href='/terms'><div><p>Cookie Declarations  </p></div></a></span>  
        
        
        </div>
        <div className='icons' ><FaLinkedin size={30} style={{ margin: '10 10px' , color:"white"}} />
        <FaInstagram size={30} style={{ margin: '10 10px', color:"white" }} />
        <FaTwitter size={30} style={{ margin: '10 10px', color:"white" }} />
        <FaFacebook size={30} style={{ margin: '10 10px', color:"white" }} /></div>

</div>
</div>
</div>

</div>
)
}

export default Footer
