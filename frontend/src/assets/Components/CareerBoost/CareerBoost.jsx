import React, { useState } from 'react';
import './CareerBoost.css';

const certificateMap = {
    'frontend developer': [
      { title: 'HTML, CSS & JavaScript Certificate', image: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
      { title: 'React Developer Certificate', image: 'https://cdn-icons-png.flaticon.com/512/919/919851.png' },
      { title: 'Responsive Web Design Certification', image: 'https://cdn-icons-png.flaticon.com/512/3523/3523063.png' },
      { title: 'Git & GitHub for Developers', image: 'https://cdn-icons-png.flaticon.com/512/2111/2111288.png' },
      { title: 'TypeScript Basics', image: 'https://cdn-icons-png.flaticon.com/512/919/919832.png' }
    ],
    'backend developer': [
      { title: 'Node.js Developer Certificate', image: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
      { title: 'SQL & Database Design', image: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { title: 'REST API Development', image: 'https://cdn-icons-png.flaticon.com/512/4150/4150897.png' },
      { title: 'Docker Fundamentals', image: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' }
    ],
    'ui/ux designer': [
      { title: 'Figma Basics', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png' },
      { title: 'User Research & Wireframing', image: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png' },
      { title: 'Adobe XD Certification', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968520.png' }
    ],
    'data analyst': [
      { title: 'Excel for Data Analysis', image: 'https://cdn-icons-png.flaticon.com/512/732/732220.png' },
      { title: 'SQL for Data Analytics', image: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { title: 'Power BI Fundamentals', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968526.png' },
      { title: 'Python for Data Analysis', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' }
    ],
    'machine learning engineer': [
      { title: 'ML with Python', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
      { title: 'Deep Learning Specialization', image: 'https://cdn-icons-png.flaticon.com/512/3800/3800024.png' },
      { title: 'TensorFlow Developer Certificate', image: 'https://cdn-icons-png.flaticon.com/512/5969/5969246.png' }
    ],
    'devops engineer': [
      { title: 'CI/CD with Jenkins', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968695.png' },
      { title: 'Docker & Kubernetes', image: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
      { title: 'Linux for DevOps', image: 'https://cdn-icons-png.flaticon.com/512/6124/6124995.png' }
    ],
    'mobile app developer': [
      { title: 'Flutter Development Certificate', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968976.png' },
      { title: 'React Native Essentials', image: 'https://cdn-icons-png.flaticon.com/512/919/919851.png' },
      { title: 'Android App Development', image: 'https://cdn-icons-png.flaticon.com/512/226/226770.png' }
    ],
    'cloud engineer': [
      { title: 'AWS Cloud Practitioner', image: 'https://cdn-icons-png.flaticon.com/512/873/873120.png' },
      { title: 'Google Cloud Fundamentals', image: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' },
      { title: 'Azure Developer Associate', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968906.png' }
    ],
    'cybersecurity analyst': [
      { title: 'Cybersecurity Basics', image: 'https://cdn-icons-png.flaticon.com/512/10027/10027415.png' },
      { title: 'Network Security Certification', image: 'https://cdn-icons-png.flaticon.com/512/3190/3190441.png' },
      { title: 'Ethical Hacking Certificate', image: 'https://cdn-icons-png.flaticon.com/512/10492/10492734.png' }
    ]
  };
  
function CareerBoost() {
  const [inputRole, setInputRole] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const roleKey = inputRole.toLowerCase().trim();
    setResults(certificateMap[roleKey] || []);
  };

  return (
    <div className="career-boost-container">
      <h1 style={{ marginBottom: '10px' }}>Career Boost Suggestions</h1>
      <p className="description">
        Enter a role like <strong>"Frontend Developer"</strong> or <strong>"Data Analyst"</strong> to get recommended certificates.
      </p>

      <div className="career-boost-form">
        <input
          type="text"
          value={inputRole}
          onChange={(e) => setInputRole(e.target.value)}
          placeholder="e.g. frontend Developer"
        />
        <button onClick={handleSearch}>Suggest</button>
      </div>

      {results.length > 0 ? (
        <div className="certificate-list">
          <h3>📜 Recommended Certificates:</h3>
          <div className="certificate-grid">
            {results.map((cert, index) => (
              <div key={index} className="certificate-card">
                <img src={cert.image} alt="certificate icon" />
                <p>{cert.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        inputRole && <p className="no-results">No suggestions found for that role.</p>
      )}
    </div>
  );
}

export default CareerBoost;
