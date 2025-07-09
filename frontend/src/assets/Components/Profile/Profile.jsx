import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Personal Information
    name: '',
    email: '',
    mobile: '',
    bio: '',
    profilePhoto: null,
    profilePhotoPreview: null,
    
    // Social Links
    linkedIn: '',
    github: '',
    leetcode: '',
    portfolioWebsite: '',
    
    // Files (Note: localStorage has size limits, so we'll only store references)
    certificates: [],
    
    // Skills
    skills: [],
    
    // Projects
    projects: [],
    
    // Education
    education: [],
    
    // Experience
    experience: [],
    
    // Co-curricular Achievements
    achievements: [],
    
    // Metadata
    lastUpdated: null
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    hostedLink: '',
    githubLink: '',
    image: null,
    imagePreview: null
  });
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: ''
  });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    date: '',
    organization: ''
  });

  const navigate = useNavigate();

  // Simulate a backend storage key using user email (or a unique ID if available)
  const getStorageKey = () => {
    const userId = profileData.email || 'default_user'; // Fallback to 'default_user' if email is not set
    return `userProfile_${userId}`;
  };

  // Load profile from localStorage when component mounts
  useEffect(() => {
    const loadProfileData = () => {
      const storageKey = getStorageKey();
      const savedProfile = localStorage.getItem(storageKey);
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfileData(parsedProfile);
        } catch (error) {
          console.error("Failed to parse saved profile:", error);
        }
      }
    };

    // Delay loading until email is available (if set by parent or auth)
    if (profileData.email) {
      loadProfileData();
    }
  }, [profileData.email]); // Depend on email to ensure we have a unique key

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profileData.email) { // Only save if email is set to avoid overwriting default_user
      const profileToSave = {
        ...profileData,
        lastUpdated: new Date().toISOString()
      };
      const storageKey = getStorageKey();
      try {
        localStorage.setItem(storageKey, JSON.stringify(profileToSave));
      } catch (error) {
        console.error("Failed to save profile to localStorage:", error);
      }
    }
  }, [profileData]);

  // Simulate logout cleanup (clear only non-essential data, keep profile data)
  const handleLogout = () => {
    // In a real app, this would be triggered by an auth system
    // Profile data remains in localStorage, tied to user email
    console.log("Logout simulated, profile data retained in storage");
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePhotoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePhoto: e.target.result, // Store as base64 string
          profilePhotoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (field, file) => {
    if (field === 'certificates') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          certificates: [...prev.certificates, {
            name: file.name,
            data: e.target.result // Store as base64 string
          }]
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          [field]: {
            name: file.name,
            data: e.target.result // Store as base64 string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleProjectImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject(prev => ({
          ...prev,
          image: e.target.result, // Store as base64 string
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    if (newProject.name && newProject.description) {
      setProfileData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject, id: Date.now() }]
      }));
      setNewProject({
        name: '',
        description: '',
        hostedLink: '',
        githubLink: '',
        image: null,
        imagePreview: null
      });
    }
  };

  const removeProject = (projectId) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }]
      }));
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: ''
      });
    }
  };

  const removeEducation = (educationId) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== educationId)
    }));
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id: Date.now() }]
      }));
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        location: ''
      });
    }
  };

  const removeExperience = (experienceId) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== experienceId)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setProfileData(prev => ({
        ...prev,
        achievements: [...prev.achievements, { ...newAchievement, id: Date.now() }]
      }));
      setNewAchievement({
        title: '',
        description: '',
        date: '',
        organization: ''
      });
    }
  };

  const removeAchievement = (achievementId) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== achievementId)
    }));
  };

  const removeCertificate = (index) => {
    setProfileData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Profile Data Submitted:', profileData);
    alert('Profile updated successfully!');
    if (onSubmit) {
      onSubmit(profileData);
    }
  };

  const renderStepIndicator = () => {
    const steps = ['Personal', 'Social Links', 'Skills & Docs', 'Projects', 'Education', 'Experience & Achievements', 'Review'];
    
    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={index} className={`step ${currentStep >= index + 1 ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h2>Personal Information</h2>
      
      <div className="profile-photo-section">
        <div className="profile-photo-preview">
          {profileData.profilePhotoPreview ? (
            <img src={profileData.profilePhotoPreview} alt="Profile" />
          ) : (
            <div className="placeholder">👤</div>
          )}
        </div>
        <div className="profile-photo-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleProfilePhotoUpload(e.target.files[0])}
            id="profile-photo-upload"
          />
          <label htmlFor="profile-photo-upload" className="photo-upload-btn">
            Upload Profile Photo
          </label>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            value={profileData.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about yourself..."
            rows="4"
          />
        </div>
      </div>
    </div>
  );

  // ... [Keeping all other render functions exactly as in the original code]
  const renderSocialLinks = () => (
    <div className="form-section">
      <h2>Social Links</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>LinkedIn Profile</label>
          <input
            type="url"
            value={profileData.linkedIn}
            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            placeholder="Enter your LinkedIn URL"
          />
        </div>
        <div className="form-group">
          <label>GitHub Profile</label>
          <input
            type="url"
            value={profileData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="Enter your GitHub URL"
          />
        </div>
        <div className="form-group">
          <label>LeetCode Profile</label>
          <input
            type="url"
            value={profileData.leetcode}
            onChange={(e) => handleInputChange('leetcode', e.target.value)}
            placeholder="Enter your LeetCode URL"
          />
        </div>
        <div className="form-group">
          <label>Portfolio Website</label>
          <input
            type="url"
            value={profileData.portfolioWebsite}
            onChange={(e) => handleInputChange('portfolioWebsite', e.target.value)}
            placeholder="Enter your portfolio URL"
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsAndFiles = () => (
    <div className="form-section">
      <h2>Skills & Documents</h2>
      <div className="form-group">
        <label>Add Skill</label>
        <div className="skill-input-group">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
          />
          <button onClick={addSkill} className="add-btn">Add Skill</button>
        </div>
      </div>
      <div className="skills-list">
        {profileData.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
            <button onClick={() => removeSkill(skill)} className="remove-btn">×</button>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label>Upload Certificates</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => handleFileUpload('certificates', e.target.files[0])}
          id="certificate-upload"
        />
        <label htmlFor="certificate-upload" className="file-upload-btn">
          Choose Files
        </label>
      </div>
      <div className="certificates-list">
        {profileData.certificates.map((cert, index) => (
          <div key={index} className="certificate-item">
            {cert.name}
            <button onClick={() => removeCertificate(index)} className="remove-btn">×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="form-section">
      <h2>Projects</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Project Name *</label>
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            placeholder="Enter project name"
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Description *</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Describe your project"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label>Hosted Link</label>
          <input
            type="url"
            value={newProject.hostedLink}
            onChange={(e) => setNewProject({ ...newProject, hostedLink: e.target.value })}
            placeholder="Enter hosted project URL"
          />
        </div>
        <div className="form-group">
          <label>GitHub Link</label>
          <input
            type="url"
            value={newProject.githubLink}
            onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
            placeholder="Enter GitHub project URL"
          />
        </div>
        <div className="form-group">
          <label>Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleProjectImageUpload(e.target.files[0])}
            id="project-image-upload"
          />
          <label htmlFor="project-image-upload" className="file-upload-btn">
            Upload Image
          </label>
        </div>
      </div>
      <button onClick={addProject} className="add-btn">Add Project</button>
      <div className="projects-list">
        {profileData.projects.map((project) => (
          <div key={project.id} className="project-item">
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            {project.imagePreview && <img src={project.imagePreview} alt={project.name} />}
            <button onClick={() => removeProject(project.id)} className="remove-btn">×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="form-section">
      <h2>Education</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Institution *</label>
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            placeholder="Enter institution name"
            required
          />
        </div>
        <div className="form-group">
          <label>Degree *</label>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            placeholder="Enter degree"
            required
          />
        </div>
        <div className="form-group">
          <label>Field of Study</label>
          <input
            type="text"
            value={newEducation.fieldOfStudy}
            onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
            placeholder="Enter field of study"
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={newEducation.startDate}
            onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={newEducation.endDate}
            onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input
            type="text"
            value={newEducation.grade}
            onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
            placeholder="Enter grade or CGPA"
          />
        </div>
      </div>
      <button onClick={addEducation} className="add-btn">Add Education</button>
      <div className="education-list">
        {profileData.education.map((edu) => (
          <div key={edu.id} className="education-item">
            <h4>{edu.institution} - {edu.degree}</h4>
            <p>{edu.fieldOfStudy} ({edu.startDate} - {edu.endDate})</p>
            <p>Grade: {edu.grade}</p>
            <button onClick={() => removeEducation(edu.id)} className="remove-btn">×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceAndAchievements = () => (
    <div className="form-section">
      <h2>Experience</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Company *</label>
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            placeholder="Enter position"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={newExperience.startDate}
            onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={newExperience.endDate}
            onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
          />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            placeholder="Describe your role"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={newExperience.location}
            onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
            placeholder="Enter location"
          />
        </div>
      </div>
      <button onClick={addExperience} className="add-btn">Add Experience</button>
      <div className="experience-list">
        {profileData.experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <h4>{exp.position} at {exp.company}</h4>
            <p>{exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
            <p>Location: {exp.location}</p>
            <button onClick={() => removeExperience(exp.id)} className="remove-btn">×</button>
          </div>
        ))}
      </div>

      <h2>Co-curricular Achievements</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
            placeholder="Enter achievement title"
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Description *</label>
          <textarea
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
            placeholder="Describe your achievement"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={newAchievement.date}
            onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Organization</label>
          <input
            type="text"
            value={newAchievement.organization}
            onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
            placeholder="Enter organization"
          />
        </div>
      </div>
      <button onClick={addAchievement} className="add-btn">Add Achievement</button>
      <div className="achievements-list">
        {profileData.achievements.map((ach) => (
          <div key={ach.id} className="achievement-item">
            <h4>{ach.title}</h4>
            <p>{ach.description}</p>
            <p>{ach.date} - {ach.organization}</p>
            <button onClick={() => removeAchievement(ach.id)} className="remove-btn">×</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="form-section">
      <h2>Review Your Profile</h2>
      <div className="review-section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {profileData.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {profileData.email || 'Not provided'}</p>
        <p><strong>Mobile:</strong> {profileData.mobile || 'Not provided'}</p>
        <p><strong>Bio:</strong> {profileData.bio || 'Not provided'}</p>
        {profileData.profilePhotoPreview && (
          <img src={profileData.profilePhotoPreview} alt="Profile" className="review-photo" />
        )}
      </div>
      <div className="review-section">
        <h3>Social Links</h3>
        <p><strong>LinkedIn:</strong> {profileData.linkedIn || 'Not provided'}</p>
        <p><strong>GitHub:</strong> {profileData.github || 'Not provided'}</p>
        <p><strong>LeetCode:</strong> {profileData.leetcode || 'Not provided'}</p>
        <p><strong>Portfolio:</strong> {profileData.portfolioWebsite || 'Not provided'}</p>
      </div>
      <div className="review-section">
        <h3>Skills</h3>
        {profileData.skills.length > 0 ? (
          <ul>
            {profileData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills added</p>
        )}
      </div>
      <div className="review-section">
        <h3>Certificates</h3>
        {profileData.certificates.length > 0 ? (
          <ul>
            {profileData.certificates.map((cert, index) => (
              <li key={index}>{cert.name}</li>
            ))}
          </ul>
        ) : (
          <p>No certificates uploaded</p>
        )}
      </div>
      <div className="review-section">
        <h3>Projects</h3>
        {profileData.projects.length > 0 ? (
          profileData.projects.map((project) => (
            <div key={project.id}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <p><strong>Hosted Link:</strong> {project.hostedLink || 'Not provided'}</p>
              <p><strong>GitHub Link:</strong> {project.githubLink || 'Not provided'}</p>
              {project.imagePreview && <img src={project.imagePreview} alt={project.name} className="review-photo" />}
            </div>
          ))
        ) : (
          <p>No projects added</p>
        )}
      </div>
      <div className="review-section">
        <h3>Education</h3>
        {profileData.education.length > 0 ? (
          profileData.education.map((edu) => (
            <div key={edu.id}>
              <h4>{edu.institution} - {edu.degree}</h4>
              <p>{edu.fieldOfStudy} ({edu.startDate} - {edu.endDate})</p>
              <p>Grade: {edu.grade || 'Not provided'}</p>
            </div>
          ))
        ) : (
          <p>No education added</p>
        )}
      </div>
      <div className="review-section">
        <h3>Experience</h3>
        {profileData.experience.length > 0 ? (
          profileData.experience.map((exp) => (
            <div key={exp.id}>
              <h4>{exp.position} at {exp.company}</h4>
              <p>{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
              <p>Location: {exp.location || 'Not provided'}</p>
            </div>
          ))
        ) : (
          <p>No experience added</p>
        )}
      </div>
      <div className="review-section">
        <h3>Achievements</h3>
        {profileData.achievements.length > 0 ? (
          profileData.achievements.map((ach) => (
            <div key={ach.id}>
              <h4>{ach.title}</h4>
              <p>{ach.description}</p>
              <p>{ach.date} - {ach.organization || 'Not provided'}</p>
            </div>
          ))
        ) : (
          <p>No achievements added</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-left">
          <h1>LinkUp.AI Profile</h1>
          <p>Complete your profile to access internships, jobs, webinars, and hackathons</p>
        </div>
        <button 
          className="post-btn"
          onClick={() => navigate("/post")}
        >
          Post
        </button>
      </div>

      {renderStepIndicator()}

      <div className="profile-form">
        {currentStep === 1 && renderPersonalInfo()}
        {currentStep === 2 && renderSocialLinks()}
        {currentStep === 3 && renderSkillsAndFiles()}
        {currentStep === 4 && renderProjects()}
        {currentStep === 5 && renderEducation()}
        {currentStep === 6 && renderExperienceAndAchievements()}
        {currentStep === 7 && renderReview()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="prof-btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 7 ? (
            <button type="button" onClick={nextStep} className="prof-btn-primary">
              Next
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="prof-btn-primary">
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;