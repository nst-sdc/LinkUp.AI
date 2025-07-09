import React, { useState } from 'react';
import './CareerBoost.css';

// Dummy data for popular certifications (keep your existing data here)
const popularCertifications = [
  { title: 'AWS Certified Solutions Architect', category: 'Cloud', issuer: 'Amazon' },
  { title: 'Certified Kubernetes Administrator', category: 'DevOps', issuer: 'CNCF' },
  { title: 'CompTIA Security+', category: 'Security', issuer: 'CompTIA' },
  { title: 'Microsoft Certified: Azure Fundamentals', category: 'Cloud', issuer: 'Microsoft' },
  { title: 'Google Associate Cloud Engineer', category: 'Cloud', issuer: 'Google' },
];

// Dummy map for local search (keep your existing data here)
const certificateMap = {
  'frontend developer': [
    { title: 'Certified Front End Developer', issuer: 'W3C', level: 'Beginner' },
    { title: 'React Developer Certification', issuer: 'Meta', level: 'Intermediate' },
    { title: 'Google Mobile Web Specialist', issuer: 'Google', level: 'Intermediate' },
  ],
  'cloud engineer': [
    { title: 'AWS Certified Solutions Architect', issuer: 'Amazon', level: 'Intermediate' },
    { title: 'Google Associate Cloud Engineer', issuer: 'Google', level: 'Beginner' },
    { title: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', level: 'Beginner' },
  ],
  'devops': [
    { title: 'Certified Kubernetes Administrator', issuer: 'CNCF', level: 'Intermediate' },
    { title: 'AWS Certified DevOps Engineer', issuer: 'Amazon', level: 'Advanced' },
    { title: 'Docker Certified Associate', issuer: 'Docker', level: 'Intermediate' },
  ],
  'security': [
    { title: 'CompTIA Security+', issuer: 'CompTIA', level: 'Beginner' },
    { title: 'Certified Ethical Hacker', issuer: 'EC-Council', level: 'Intermediate' },
    { title: 'CISSP', issuer: 'ISC2', level: 'Advanced' },
  ],
};

const CareerBoost = () => {
  const [inputRole, setInputRole] = useState('');
  const [results, setResults] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  // Call your backend OpenAI proxy
  const callOpenAI = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response';
    } catch (err) {
      return 'Error contacting OpenAI API';
    }
  };

  // Enter key handler: local search + AI
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      // Local search
      const role = inputRole.trim().toLowerCase();
      let foundKey = null;
      Object.keys(certificateMap).forEach((key) => {
        if (role.includes(key)) foundKey = key;
      });
      if (foundKey) {
        setResults(certificateMap[foundKey]);
      } else {
        setResults([]);
      }

      // AI search
      if (!inputRole.trim()) {
        setAiResponse('Please enter a role to get AI suggestions.');
        return;
      }
      setLoadingAI(true);
      setAiResponse('');
      const prompt = `Suggest top IT certifications for the role: ${inputRole}. List them with issuer and level if possible.`;
      const result = await callOpenAI(prompt);
      setAiResponse(result);
      setLoadingAI(false);
    }
  };

  return (
    <div className="career-boost-container">
      <div className="header-section">
        <h1>IT Career Certification Guide</h1>
        <p className="description">
          Discover valuable certifications to boost your IT career
        </p>
        <div className="search-container">
          <input
            type="text"
            value={inputRole}
            id="search-bar"
            onChange={(e) => setInputRole(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by role (e.g. Frontend Developer, Cloud Engineer)"
            disabled={loadingAI}
          />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="results-section">
          <h2>Recommended Certifications for {inputRole}</h2>
          <div className="certificate-grid">
            {results.map((cert, index) => (
              <div key={index} className="certificate-card">
                <h3>{cert.title}</h3>
                <p className="issuer">Issued by: {cert.issuer}</p>
                <span className={`level ${cert.level.toLowerCase()}`}>
                  {cert.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        inputRole.trim() && (
          <p className="no-results">No certifications found for "{inputRole}"</p>
        )
      )}

      {/* AI Response Section */}
      {aiResponse && (
        <div className="results-section">
          <h2>AI Suggested Certifications</h2>
          <div style={{ whiteSpace: 'pre-line', background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>
            {loadingAI ? 'Loading AI suggestions...' : aiResponse}
          </div>
        </div>
      )}

      <div className="importance-section">
        <h2>Why IT Certifications Matter</h2>
        <div className="importance-grid">
          <div className="importance-card">
            <h3>Career Advancement</h3>
            <p>Certifications can lead to promotions and salary increases, with many employers requiring them for senior positions.</p>
          </div>
          <div className="importance-card">
            <h3>Skill Validation</h3>
            <p>They provide third-party verification of your skills and knowledge in specific technologies.</p>
          </div>
          <div className="importance-card">
            <h3>Industry Recognition</h3>
            <p>Many certifications are globally recognized standards that demonstrate your commitment to professional development.</p>
          </div>
          <div className="importance-card">
            <h3>Keeping Skills Current</h3>
            <p>The process of certification ensures you stay updated with the latest technologies and best practices.</p>
          </div>
        </div>
      </div>

      <div className="popular-certifications">
        <h2>Popular IT Certifications</h2>
        <div className="certification-table">
          <table>
            <thead>
              <tr>
                <th>Certification</th>
                <th>Category</th>
                <th>Issuer</th>
              </tr>
            </thead>
            <tbody>
              {popularCertifications.map((cert, index) => (
                <tr key={index}>
                  <td>{cert.title}</td>
                  <td>{cert.category}</td>
                  <td>{cert.issuer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tips-section">
        <h2>Certification Tips</h2>
        <ul>
          <li>Choose certifications aligned with your career goals and current skill level</li>
          <li>Check job postings for your target roles to see which certifications are most valued</li>
          <li>Consider both vendor-specific (AWS, Microsoft) and vendor-neutral (CompTIA) certifications</li>
          <li>Many certifications require renewal - factor in maintenance costs and time</li>
          <li>Combine certifications with practical experience for maximum impact</li>
        </ul>
      </div>
    </div>
  );
};

export default CareerBoost;