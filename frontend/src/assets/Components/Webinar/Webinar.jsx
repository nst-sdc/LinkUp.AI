import { useEffect, useState } from 'react';
import './Webinar.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Webinar() {
  const [activeTab, setActiveTab] = useState('live');
  const [webinars, setWebinars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'webinars'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWebinars(data);
        console.log("Fetched webinars from Firebase:", data);
      } catch (err) {
        console.error("Error fetching webinars:", err);
      }
    };

    fetchWebinars();
  }, []);

  const handleRegister = (webinarTitle) => {
    alert(`Registration functionality would be implemented here for: ${webinarTitle}`);
  };

  return (
    <div className="webinars-container">
      <div className="container">
        <div className="header-with-button">
          <h1>LinkUp.AI Webinars</h1>
          <button className="create-event-btn" onClick={() => navigate('/Eventform')}>
            Create Event
          </button>
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


        <div className="webinars-list">
          {webinars
            .filter(w => (w.type || '').toLowerCase().trim() === activeTab)
            .map((webinar) => (
              <div key={webinar.id} className="webinar-card">
                <div className="webinar-header accent-gradient">
                  <div className="webinar-header-content">
                    <div className="day-column">{webinar.date}</div>
                    <div className="time-column">{webinar.time}</div>
                    <div className="title-column">{webinar.title}</div>
                  </div>
                </div>

                <div className="webinar-content">
                  <p className="webinar-description">{webinar.description}</p>

                  <div className="session-details">
                    <h3>Speaker: {webinar.speaker}</h3>
                    <p>
                      Duration: {webinar.duration} mins | Max Attendees: {webinar.maxAttendees}
                    </p>
                  </div>

                  <div className="register-section">
                    <a
                      href={webinar.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="register-btn">REGISTER</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
