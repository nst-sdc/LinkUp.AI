import React from 'react'
import './footer.css'
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='in_footer section_padding' >
            <div className='footer_links'>
                {/* for the every section there will be the new page and that page link we will add when we will make there page till then leave it as it is  */}
                <div className='footer_links1'>
                    <h4>Company</h4>
                    <a href='/AboutUs'><p>About Us</p></a>  
                    <a href='/Accessibilty'><p>Accessibilty</p></a>
                    <a href='/Support'><p>Support</p></a>  
                </div>

                <div className='footer_links1'>
                    <h4>Privacy</h4>
                    <a href='/AboutUs'><p>Privacy Policy</p></a>  
                    <a href='/Accessibilty'><p>Ad Choices</p></a>
                    <a href='/Support'><p>Promos</p></a>  
                </div>

                <div className='footer_links1'>
                    <h4>More</h4>
                    <a href='/AboutUs'><p>Business</p></a>  
                    <a href='/Accessibilty'><p>Get the App</p></a>
                    <a href='/Support'><p>Something Else</p></a>  
                </div>

                <div className='footer_links1'>
                    <h4>Contact</h4>
                    <a href='/AboutUs'><p>Help line</p></a>  
                    <a href='/Accessibilty'><p>Contact</p></a>
                    <a href='/Support'><p>Press </p></a>  
                </div>

                {/* the below section is for social media accounds for which we have to add the images we will do it letter */}

                {/* <div className='footer_links1'>   
                    <h4>Coming soon on </h4>
                    <div className='socialMedia'></div>
                    <p><img src={fb} alt=''/></p>
                    <p><img src={twitter} alt=''/></p>
                    <p><img src={Linkedin} alt=''/></p>  
                    <p><img src={Insta } alt=''/></p>  
                </div>  */}
 
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