import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const location = useLocation();
  const { profileData = {} } = location.state || {};
  console.log('profileData in ResumeBuilder:', profileData); // Debug log

  const [isGenerating, setIsGenerating] = useState(false);

  // Helper function to format dates
  const formatDate = (date) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Invalid Date' : `${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // Generate PDF content
  const generatePDF = () => {
    const {
      name = 'Your Name',
      email = '',
      mobile = '',
      linkedIn = '',
      github = '',
      leetcode = '',
      portfolioWebsite = '',
      bio = '',
      education = [],
      experience = [],
      projects = [],
      skills = [],
      achievements = [],
    } = profileData;

    const doc = new jsPDF();
    let yPosition = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - (2 * margin);

    // Set font styles
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(name, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Contact information
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const contactInfo = [];
    if (email) contactInfo.push(email);
    if (mobile) contactInfo.push(mobile);
    if (linkedIn) contactInfo.push('LinkedIn');
    if (github) contactInfo.push('GitHub');
    if (leetcode) contactInfo.push('LeetCode');
    if (portfolioWebsite) contactInfo.push('Portfolio');
    
    if (contactInfo.length > 0) {
      doc.text(contactInfo.join(' | '), pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
    }

    // Bio
    if (bio) {
      doc.setFont(undefined, 'italic');
      const bioLines = doc.splitTextToSize(bio, contentWidth);
      doc.text(bioLines, margin, yPosition);
      yPosition += (bioLines.length * 7) + 10;
    }

    // Education Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Education', margin, yPosition);
    yPosition += 10;

    if (education.length > 0) {
      education.forEach(edu => {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        const degree = `${edu.degree || ''}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}`;
        doc.text(degree, margin, yPosition);
        
        doc.setFont(undefined, 'normal');
        yPosition += 7;
        doc.text(`${edu.institution || ''}${edu.grade ? `, ${edu.grade}` : ''}`, margin, yPosition);
        yPosition += 7;
        doc.text(`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`, margin, yPosition);
        yPosition += 15;
      });
    } else {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('No education details provided.', margin, yPosition);
      yPosition += 10;
    }

    // Experience Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Experience', margin, yPosition);
    yPosition += 10;

    if (experience.length > 0) {
      experience.forEach(exp => {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(exp.position || '', margin, yPosition);
        
        doc.setFont(undefined, 'normal');
        yPosition += 7;
        doc.text(`${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}`, margin, yPosition);
        yPosition += 7;
        doc.text(`${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`, margin, yPosition);
        yPosition += 7;
        
        const description = exp.description || 'No description provided.';
        const descLines = doc.splitTextToSize(description, contentWidth);
        doc.text(descLines, margin, yPosition);
        yPosition += (descLines.length * 7) + 10;
      });
    } else {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('No experience details provided.', margin, yPosition);
      yPosition += 10;
    }

    // Projects Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Projects', margin, yPosition);
    yPosition += 10;

    if (projects.length > 0) {
      projects.forEach(proj => {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(proj.name || '', margin, yPosition);
        
        doc.setFont(undefined, 'normal');
        yPosition += 7;
        const description = proj.description || 'No description provided.';
        const descLines = doc.splitTextToSize(description, contentWidth);
        doc.text(descLines, margin, yPosition);
        yPosition += (descLines.length * 7) + 10;
      });
    } else {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('No projects added.', margin, yPosition);
      yPosition += 10;
    }

    // Skills Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Skills', margin, yPosition);
    yPosition += 10;

    if (skills.length > 0) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      skills.forEach(skill => {
        doc.text(`• ${skill}`, margin, yPosition);
        yPosition += 7;
      });
    } else {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('No skills listed.', margin, yPosition);
      yPosition += 10;
    }

    // Achievements Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Achievements', margin, yPosition);
    yPosition += 10;

    if (achievements.length > 0) {
      achievements.forEach(ach => {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(ach.title || '', margin, yPosition);
        
        doc.setFont(undefined, 'normal');
        yPosition += 7;
        doc.text(`${ach.organization ? `${ach.organization}, ` : ''}${ach.date ? formatDate(ach.date) : ''}`, margin, yPosition);
        yPosition += 7;
        
        const description = ach.description || 'No description provided.';
        const descLines = doc.splitTextToSize(description, contentWidth);
        doc.text(descLines, margin, yPosition);
        yPosition += (descLines.length * 7) + 10;
      });
    } else {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('No achievements listed.', margin, yPosition);
      yPosition += 10;
    }

    return doc;
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    try {
      const doc = generatePDF();
      doc.save(`${profileData.name || 'resume'}.pdf`);
      alert('Resume PDF file downloaded successfully!');
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="resume-builder-container">
      <h1>AI Resume Builder</h1>
      <p>Generate a professional resume based on your profile data.</p>
      
      <div className="resume-preview">
        <h2>Resume Preview</h2>
        {profileData.name ? (
          <div className="resume-content">
            <h3>{profileData.name}</h3>
            <p>
              {profileData.email && `${profileData.email} | `}
              {profileData.mobile && `${profileData.mobile} | `}
              {profileData.linkedIn && <a href={profileData.linkedIn}>LinkedIn</a>}
              {profileData.github && ` | `}{profileData.github && <a href={profileData.github}>GitHub</a>}
              {profileData.leetcode && ` | `}{profileData.leetcode && <a href={profileData.leetcode}>LeetCode</a>}
              {profileData.portfolioWebsite && ` | `}{profileData.portfolioWebsite && <a href={profileData.portfolioWebsite}>Portfolio</a>}
            </p>
            {profileData.bio && <p>{profileData.bio}</p>}

            <h4>Education</h4>
            {profileData.education?.length > 0 ? (
              profileData.education.map((edu, index) => (
                <div key={index} className="section-item">
                  <p><strong>{edu.degree || ''}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong></p>
                  <p>{edu.institution || ''}{edu.grade ? `, ${edu.grade}` : ''}</p>
                  <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              ))
            ) : (
              <p>No education details provided.</p>
            )}

            <h4>Experience</h4>
            {profileData.experience?.length > 0 ? (
              profileData.experience.map((exp, index) => (
                <div key={index} className="section-item">
                  <p><strong>{exp.position || ''}</strong></p>
                  <p>{exp.company || ''}{exp.location ? `, ${exp.location}` : ''}</p>
                  <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                  <p>{exp.description || 'No description provided.'}</p>
                </div>
              ))
            ) : (
              <p>No experience details provided.</p>
            )}

            <h4>Projects</h4>
            {profileData.projects?.length > 0 ? (
              profileData.projects.map((proj, index) => (
                <div key={index} className="section-item">
                  <p><strong>{proj.name || ''}</strong></p>
                  <p>{proj.description || 'No description provided.'}</p>
                  {proj.hostedLink && <p><a href={proj.hostedLink}>Live Project</a></p>}
                  {proj.githubLink && <p><a href={proj.githubLink}>GitHub</a></p>}
                </div>
              ))
            ) : (
              <p>No projects added.</p>
            )}

            <h4>Skills</h4>
            {profileData.skills?.length > 0 ? (
              <ul>
                {profileData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}

            <h4>Achievements</h4>
            {profileData.achievements?.length > 0 ? (
              profileData.achievements.map((ach, index) => (
                <div key={index} className="section-item">
                  <p><strong>{ach.title || ''}</strong></p>
                  <p>{ach.organization ? `${ach.organization}, ` : ''}{ach.date ? formatDate(ach.date) : ''}</p>
                  <p>{ach.description || 'No description provided.'}</p>
                </div>
              ))
            ) : (
              <p>No achievements listed.</p>
            )}
          </div>
        ) : (
          <p>Please complete your profile to generate a resume.</p>
        )}
      </div>

      <button 
        className="generate-btn" 
        onClick={handleGenerateResume} 
        disabled={isGenerating || !profileData.name}
      >
        {isGenerating ? 'Generating...' : 'Download Resume'}
      </button>
    </div>
  );
};

export default ResumeBuilder;
