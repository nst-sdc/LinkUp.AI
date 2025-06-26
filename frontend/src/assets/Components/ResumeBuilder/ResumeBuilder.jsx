
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  // Generate LaTeX content
  const generateLatex = () => {
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

    return `
\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\geometry{a4paper, margin=1in}

\\begin{document}

\\begin{center}
    {\\Large \\textbf{${name}}}\\\\
    \\vspace{0.1in}
    ${email ? `\\href{mailto:${email}}{${email}}` : ''} 
    ${mobile ? `\\ \\ $|$ \\ ${mobile}` : ''}\\\\
    ${linkedIn ? `\\href{${linkedIn}}{LinkedIn}` : ''} 
    ${github ? `$|$ \\href{${github}}{GitHub}` : ''} 
    ${leetcode ? `$|$ \\href{${leetcode}}{LeetCode}` : ''} 
    ${portfolioWebsite ? `$|$ \\href{${portfolioWebsite}}{Portfolio}` : ''}\\\\
    \\vspace{0.1in}
    ${bio ? `\\textit{${bio}}` : ''}\\\\
\\end{center}

\\section*{Education}
${education.length > 0 ? education.map(edu => `
    \\textbf{${edu.degree || ''}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}} \\hfill ${formatDate(edu.startDate)} -- ${formatDate(edu.endDate)}\\\\
    ${edu.institution || ''}${edu.grade ? `, ${edu.grade}` : ''}\\\\
`).join('\n') : 'No education details provided.'}

\\section*{Experience}
${experience.length > 0 ? experience.map(exp => `
    \\textbf{${exp.position || ''}} \\hfill ${formatDate(exp.startDate)} -- ${formatDate(exp.endDate)}\\\\
    ${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}\\\\
    \\begin{itemize}[leftmargin=*]
        \\item ${exp.description || 'No description provided.'}
    \\end{itemize}
`).join('\n') : 'No experience details provided.'}

\\section*{Projects}
${projects.length > 0 ? projects.map(proj => `
    \\textbf{${proj.name || ''}} \\hfill 
    ${proj.hostedLink ? `\\href{${proj.hostedLink}}{[Live]} ` : ''}${proj.githubLink ? `\\href{${proj.githubLink}}{[GitHub]}` : ''}\\\\
    \\begin{itemize}[leftmargin=*]
        \\item ${proj.description || 'No description provided.'}
    \\end{itemize}
`).join('\n') : 'No projects added.'}

\\section*{Skills}
${skills.length > 0 ? `\\begin{itemize}[leftmargin=*]
    ${skills.map(skill => `\\item ${skill}`).join('\n    ')}
\\end{itemize}` : 'No skills listed.'}

\\section*{Achievements}
${achievements.length > 0 ? achievements.map(ach => `
    \\textbf{${ach.title || ''}} \\hfill ${ach.date ? formatDate(ach.date) : ''}\\\\
    ${ach.organization ? `${ach.organization}, ` : ''}${ach.description || 'No description provided.'}\\\\
`).join('\n') : 'No achievements listed.'}

\\end{document}
`;
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    try {
      const latexContent = generateLatex();
      const blob = new Blob([latexContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${profileData.name || 'resume'}.tex`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      alert('Resume LaTeX file downloaded! Compile it with a LaTeX editor to generate the PDF.');
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
