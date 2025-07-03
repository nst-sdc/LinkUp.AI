import React, { useState } from 'react';
import './CareerBoost.css';

const CareerBoost = () => {
  const [inputRole, setInputRole] = useState('');
  const [results, setResults] = useState([]);

  const certificateMap = {
    'frontend developer': [
      { title: 'HTML, CSS & JavaScript Certificate', issuer: 'freeCodeCamp', level: 'Beginner' },
      { title: 'React Developer Certificate', issuer: 'Meta', level: 'Intermediate' },
      { title: 'Front End Development Libraries', issuer: 'freeCodeCamp', level: 'Intermediate' },
      { title: 'Advanced JavaScript Concepts', issuer: 'Udemy', level: 'Advanced' },
    ],
    'backend developer': [
      { title: 'Node.js Developer Certificate', issuer: 'OpenJS Foundation', level: 'Intermediate' },
      { title: 'SQL & Database Design', issuer: 'Stanford University', level: 'Intermediate' },
      { title: 'REST API Development', issuer: 'IBM', level: 'Intermediate' },
      { title: 'Docker Fundamentals', issuer: 'Docker Inc.', level: 'Intermediate' },
    ],
    'data analyst': [
      { title: 'Google Data Analytics', issuer: 'Google', level: 'Beginner' },
      { title: 'Microsoft Certified: Data Analyst Associate', issuer: 'Microsoft', level: 'Intermediate' },
      { title: 'IBM Data Science Professional', issuer: 'IBM', level: 'Intermediate' },
      { title: 'Tableau Desktop Specialist', issuer: 'Tableau', level: 'Beginner' },
    ],
    'cybersecurity': [
      { title: 'CompTIA Security+', issuer: 'CompTIA', level: 'Intermediate' },
      { title: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', level: 'Advanced' },
      { title: 'CISSP', issuer: '(ISC)²', level: 'Advanced' },
      { title: 'Google Cybersecurity Certificate', issuer: 'Google', level: 'Beginner' },
    ],
    'cloud engineer': [
      { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', level: 'Intermediate' },
      { title: 'Google Cloud Professional', issuer: 'Google Cloud', level: 'Intermediate' },
      { title: 'Microsoft Certified: Azure Administrator', issuer: 'Microsoft', level: 'Intermediate' },
      { title: 'Cloud Security Certification', issuer: 'Cloud Security Alliance', level: 'Advanced' },
    ],
    'devops engineer': [
    { title: 'Docker Certified Associate', issuer: 'Docker Inc.', level: 'Intermediate' },
    { title: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', level: 'Intermediate' },
    { title: 'AWS Certified DevOps Engineer', issuer: 'Amazon Web Services', level: 'Advanced' },
    { title: 'Microsoft Certified: DevOps Engineer Expert', issuer: 'Microsoft', level: 'Advanced' },
  ],
  'ai engineer': [
    { title: 'TensorFlow Developer Certificate', issuer: 'TensorFlow', level: 'Intermediate' },
    { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', level: 'Advanced' },
    { title: 'AI for Everyone', issuer: 'DeepLearning.AI', level: 'Beginner' },
    { title: 'Microsoft Certified: Azure AI Engineer Associate', issuer: 'Microsoft', level: 'Intermediate' },
  ],
  'machine learning engineer': [
    { title: 'Machine Learning Specialization', issuer: 'Coursera - Andrew Ng', level: 'Intermediate' },
    { title: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', level: 'Advanced' },
    { title: 'MLOps Fundamentals', issuer: 'Google Cloud', level: 'Intermediate' },
    { title: 'Professional Machine Learning Engineer', issuer: 'Google Cloud', level: 'Advanced' },
  ],
  'ui ux designer': [
    { title: 'Google UX Design Professional Certificate', issuer: 'Google', level: 'Beginner' },
    { title: 'UI/UX Design Specialization', issuer: 'California Institute of the Arts', level: 'Intermediate' },
    { title: 'Adobe Certified Professional: UX Design', issuer: 'Adobe', level: 'Advanced' },
    { title: 'Human-Computer Interaction', issuer: 'University of California, San Diego', level: 'Intermediate' },
  ],
  'mobile app developer': [
    { title: 'Android Developer Certification', issuer: 'Google', level: 'Intermediate' },
    { title: 'Flutter Development', issuer: 'Udemy', level: 'Beginner' },
    { title: 'iOS App Development with Swift', issuer: 'Coursera', level: 'Intermediate' },
    { title: 'React Native Mobile Development', issuer: 'Meta', level: 'Intermediate' },
  ],
  };

  const popularCertifications = [
    { title: 'AWS Certified Solutions Architect', category: 'Cloud', issuer: 'Amazon Web Services' },
    { title: 'Certified Information Systems Security Professional (CISSP)', category: 'Security', issuer: '(ISC)²' },
    { title: 'Google Data Analytics Professional Certificate', category: 'Data', issuer: 'Google' },
    { title: 'Microsoft Certified: Azure Fundamentals', category: 'Cloud', issuer: 'Microsoft' },
    { title: 'CompTIA A+', category: 'IT Fundamentals', issuer: 'CompTIA' },
    { title: 'Project Management Professional (PMP)', category: 'Management', issuer: 'PMI' },
  ];


  const handleSearch = () => {
    const roleKey = inputRole.toLowerCase().trim();

    if (!roleKey) {
      setResults([]);
      return;
    }

    // Exact match or partial match
    const foundKey = Object.keys(certificateMap).find((key) =>
      key.toLowerCase().includes(roleKey)
    );

    if (foundKey) {
      setResults(certificateMap[foundKey]);
    } else {
      setResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSearch();
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
            onChange={(e) => setInputRole(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by role (e.g. Frontend Developer, Cloud Engineer)"
          />
          <button className='search-bth' onClick={handleButtonClick}>Find Certifications</button>
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
