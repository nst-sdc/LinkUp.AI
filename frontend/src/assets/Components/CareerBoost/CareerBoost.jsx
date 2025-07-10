import React, { useState } from 'react';
import certificateMap from '../../../data/certificateMap';
import './CareerBoost.css';

const popularCertifications = [
  { title: 'AWS Certified Solutions Architect', category: 'Cloud', issuer: 'Amazon' },
  { title: 'Certified Kubernetes Administrator', category: 'DevOps', issuer: 'CNCF' },
  { title: 'CompTIA Security+', category: 'Security', issuer: 'CompTIA' },
  { title: 'Microsoft Certified: Azure Fundamentals', category: 'Cloud', issuer: 'Microsoft' },
  { title: 'Google Associate Cloud Engineer', category: 'Cloud', issuer: 'Google' },
];

const CareerBoost = () => {
  const [inputRole, setInputRole] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const performSearch = (value) => {
    const role = value.trim().toLowerCase();
    let foundKey = null;
    Object.keys(certificateMap).forEach((key) => {
      if (role.includes(key)) foundKey = key;
    });

    if (foundKey) {
      setResults(certificateMap[foundKey]);
    } else {
      setResults([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputRole(value);

    if (value.trim() === '') {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const matches = Object.keys(certificateMap).filter((role) =>
      role.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);

    performSearch(value);
  };

  const handleSuggestionClick = (role) => {
    setInputRole(role);
    setSuggestions([]);
    performSearch(role);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSuggestions([]);
      performSearch(inputRole);
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
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by role (e.g. Frontend Developer, Cloud Engineer)"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((role, index) => (
                <li key={index} onClick={() => handleSuggestionClick(role)}>
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="results-section">
          <h2>Recommended Certifications for {inputRole}</h2>
          <div className="certificate-grid">
            {results.map((cert, index) => (
              <div key={index} className="certificate-card search-result">
                <img src={cert.image || 'https://cdn-icons-png.flaticon.com/512/1161/1161753.png'} alt={cert.title} />
                <h3>{cert.title}</h3>
                <p className="issuer">Issued by: {cert.issuer}</p>
                <span className={`level-badge ${cert.level.toLowerCase()}`}>
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
