import { useState } from 'react';
import './Webinar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Webinar() {
 const [activeTab, setActiveTab] = useState('live');


 const handleRegister = (webinarTitle) => {
   alert(`Registration functionality would be implemented here for: ${webinarTitle}`);
 };


 const webinars = [
   {
     id: 1,
     day: "Every alternate Thursday",
     time: "10:00 a.m PT / 10:30 p.m IST",
     title: "Master your AI connections",
     description: "Join us for a 60 minute session to explore LinkUp.AI, ask questions and automate your networking and connection management.",
     features: [
       "Setting up LinkUp.AI",
       "LinkUp.AI mobile app demo",
       "Integrations",
       "Scenarios & Solutions"
     ],
     gradientClass: "accent-gradient"
   },
   {
     id: 2,
     day: "June 25, 2025 at Wednesday",
     time: "9:00 p.m. IST | 11:30 a.m. EDT",
     title: "Level up your team's productivity and day-to-day collaboration with LinkUp.AI",
     description: "Discover how LinkUp.AI can transform your team's networking capabilities and streamline collaboration through intelligent connection management.",
     features: [
       "Team collaboration features",
       "Advanced AI networking tools",
       "Productivity workflows",
       "Real-time connection insights"
     ],
     gradientClass: "accent-gradient-alt"
   }
 ];

 const navigate = useNavigate();


 return (
   <div className="webinars-container">
     <div className="container">
       {/* Header */}
       <div className="header-with-button">
        <h1>LinkUp.AI Webinars</h1>
        <button className="create-event-btn" onClick={() => navigate('/Eventform')}>Create Event</button>
      </div>




       <div className="nav-tabs">
         <button
           onClick={() => setActiveTab('live')}
           className={`nav-tab ${activeTab === 'live' ? 'active' : ''}`}
         >
           Live webinars
         </button>
         <button
           onClick={() => setActiveTab('recorded')}
           className={`nav-tab ${activeTab === 'recorded' ? 'active' : ''}`}
         >
           Recorded webinars
         </button>
       </div>


       {/* Webinar Cards */}
       <div className="webinars-list">
         {webinars.map((webinar) => (
           <div key={webinar.id} className="webinar-card">
             {/*Card Header */}
             <div className={`webinar-header ${webinar.gradientClass}`}>
               <div className="webinar-header-content">
                 <div className="day-column">{webinar.day}</div>
                 <div className="time-column">{webinar.time}</div>
                 <div className="title-column">{webinar.title}</div>
               </div>
             </div>


             {/* Card Content */}
             <div className="webinar-content">
               <p className="webinar-description">
                 {webinar.description}
               </p>


               <div className="session-details">
                 <h3>What's covered in this session?</h3>
                 <div className="features-grid">
                   {webinar.features.map((feature, index) => (
                     <div key={index} className="feature-item">
                       {feature}
                     </div>
                   ))}
                 </div>
               </div>


               <div className="register-section">
                 <button onClick={() => handleRegister(webinar.title)} className="register-btn"> REGISTE </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}
