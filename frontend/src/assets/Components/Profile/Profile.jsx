import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { db } from '../../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { uploadToCloudinary, uploadMultipleToCloudinary } from '../../../utils/cloudinary';
import UploadProgress from './UploadProgress';

const Profile = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    bio: '',
    profilePhoto: null,
    profilePhotoPreview: null,
    
 
    linkedIn: '',
    github: '',
    leetcode: '',
    portfolioWebsite: '',
    
  
    certificates: [],
    
   
    skills: [],
    
  
    projects: [],
    
  
    education: [],
    
  
    experience: [],
    
  
    achievements: []
  });

 
  const [uploadProgress, setUploadProgress] = useState({
    profilePhoto: 0,
    certificates: {},
    projectImages: {}
  });

  const [isUploading, setIsUploading] = useState({
    profilePhoto: false,
    certificates: false,
    projectImages: false
  });

  const isSignedIn = true;

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

  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const handleProfilePhotoUpload = async (file) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Profile photo must be less than 4 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePhotoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);

      setIsUploading(prev => ({ ...prev, profilePhoto: true }));
      setUploadProgress(prev => ({ ...prev, profilePhoto: 0 }));

      try {
        const cloudinaryUrl = await uploadToCloudinary(
          file,
          (progress) => setUploadProgress(prev => ({ ...prev, profilePhoto: progress })),
          'profile-photos'
        );

        setProfileData(prev => ({
          ...prev,
          profilePhoto: cloudinaryUrl
        }));
      } catch (error) {
        console.error('Profile photo upload failed:', error);
        alert('Failed to upload profile photo. Please try again.');
      } finally {
        setIsUploading(prev => ({ ...prev, profilePhoto: false }));
        setUploadProgress(prev => ({ ...prev, profilePhoto: 0 }));
      }
    }
  };

  const handleFileUpload = async (field, files) => {
    if (field === 'certificates') {
      const fileArray = Array.isArray(files) ? files : [files];
      
      const oversized = fileArray.find(file => file.size > MAX_FILE_SIZE);
      if (oversized) {
        alert(`Certificate file "${oversized.name}" is larger than 4 MB. Please choose a smaller file.`);
        return;
      }

      const tempCertificates = fileArray.map(file => ({
        name: file.name,
        size: file.size,
        tempId: Date.now() + Math.random()
      }));
      
      setProfileData(prev => ({
        ...prev,
        certificates: [...prev.certificates, ...tempCertificates]
      }));

      setIsUploading(prev => ({ ...prev, certificates: true }));
      
      try {
        const cloudinaryUrls = await uploadMultipleToCloudinary(
          fileArray,
          (fileIndex, progress) => {
            setUploadProgress(prev => ({
              ...prev,
              certificates: {
                ...prev.certificates,
                [tempCertificates[fileIndex].tempId]: progress
              }
            }));
          },
          'certificates'
        );

        setProfileData(prev => ({
          ...prev,
          certificates: prev.certificates.map(cert => {
            const tempCert = tempCertificates.find(tc => tc.tempId === cert.tempId);
            if (tempCert) {
              const urlIndex = tempCertificates.indexOf(tempCert);
              return {
                name: tempCert.name,
                url: cloudinaryUrls[urlIndex]
              };
            }
            return cert;
          })
        }));
      } catch (error) {
        console.error('Certificate upload failed:', error);
        alert('Failed to upload some certificates. Please try again.');
        
        setProfileData(prev => ({
          ...prev,
          certificates: prev.certificates.filter(cert => !cert.tempId)
        }));
      } finally {
        setIsUploading(prev => ({ ...prev, certificates: false }));
        setUploadProgress(prev => ({ ...prev, certificates: {} }));
      }
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: files
      }));
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

  const handleProjectImageUpload = async (file) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Project image must be less than 4 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject(prev => ({
          ...prev,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);

      const tempId = Date.now() + Math.random();
      setIsUploading(prev => ({ ...prev, projectImages: true }));
      setUploadProgress(prev => ({
        ...prev,
        projectImages: { ...prev.projectImages, [tempId]: 0 }
      }));

      try {
        const cloudinaryUrl = await uploadToCloudinary(
          file,
          (progress) => setUploadProgress(prev => ({
            ...prev,
            projectImages: { ...prev.projectImages, [tempId]: progress }
          })),
          'project-images'
        );

        setNewProject(prev => ({
          ...prev,
          image: cloudinaryUrl
        }));
      } catch (error) {
        console.error('Project image upload failed:', error);
        alert('Failed to upload project image. Please try again.');
      } finally {
        setIsUploading(prev => ({ ...prev, projectImages: false }));
        setUploadProgress(prev => {
          const newProjectImages = { ...prev.projectImages };
          delete newProjectImages[tempId];
          return { ...prev, projectImages: newProjectImages };
        });
      }
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

  const handleSubmit = async () => {
    console.log('Profile Data Submitted:', profileData); 
    
   
    if (!profileData.name || !profileData.email || !profileData.mobile) {
      alert('Please fill in all required fields (Name, Email, Mobile)');
      return;
    }
    
   
    const profileDataForFirebase = {
     
      personalInfo: {
        name: profileData.name,
        email: profileData.email,
        mobile: profileData.mobile,
        bio: profileData.bio,
        profilePhoto: profileData.profilePhoto || null
      },
      
    
      socialLinks: {
        linkedIn: profileData.linkedIn,
        github: profileData.github,
        leetcode: profileData.leetcode,
        portfolioWebsite: profileData.portfolioWebsite
      },
      
    
      skills: profileData.skills,
      
     
      certificates: profileData.certificates
        .filter(cert => cert.url) 
        .map(cert => ({
          name: cert.name,
          url: cert.url,
          uploadedAt: Timestamp.now()
        })),
      
     
      projects: profileData.projects.map(project => ({
        name: project.name,
        description: project.description,
        hostedLink: project.hostedLink || null,
        githubLink: project.githubLink || null,
        image: project.image || null, 
        createdAt: Timestamp.now()
      })),
      
     
      education: profileData.education,
      
   
      experience: profileData.experience,
      
     
      achievements: profileData.achievements,
      
   
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      
     
      uploadStats: {
        totalCertificates: profileData.certificates.filter(cert => cert.url).length,
        totalProjects: profileData.projects.length,
        hasProfilePhoto: !!profileData.profilePhoto
      }
    };

    console.log("📤 Submitting profile data to Firestore:", profileDataForFirebase);
    
   
    console.log("🔗 Cloudinary URLs being saved:");
    if (profileDataForFirebase.personalInfo.profilePhoto) {
      console.log("Profile Photo:", profileDataForFirebase.personalInfo.profilePhoto);
    }
    if (profileDataForFirebase.certificates.length > 0) {
      console.log("Certificates:", profileDataForFirebase.certificates.map(c => ({ name: c.name, url: c.url })));
    }
    if (profileDataForFirebase.projects.length > 0) {
      console.log("Projects with images:", profileDataForFirebase.projects.filter(p => p.image).map(p => ({ name: p.name, image: p.image })));
    }

    try {
      const docRef = await addDoc(collection(db, 'profiles'), profileDataForFirebase);
      console.log("Profile document written with ID: ", docRef.id);
      
     
      onSubmit(profileData);
      
     
      const uploadStats = profileDataForFirebase.uploadStats;
      let successMessage = 'Profile saved successfully!';
      
      if (uploadStats.hasProfilePhoto) {
        successMessage += '\n✅ Profile photo uploaded to Cloudinary';
      }
      if (uploadStats.totalCertificates > 0) {
        successMessage += `\n📄 ${uploadStats.totalCertificates} certificate(s) uploaded to Cloudinary`;
      }
      if (uploadStats.totalProjects > 0) {
        successMessage += `\n💼 ${uploadStats.totalProjects} project(s) saved`;
      }
      
      alert(successMessage);
    } catch (err) {
      console.error("🔥 Firestore Error:", err.code, err.message);
      alert("Failed to save profile to database. Please try again.");
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
            disabled={isUploading.profilePhoto}
          />
          <label htmlFor="profile-photo-upload" className="photo-upload-btn">
            {isUploading.profilePhoto ? 'Uploading...' : 'Upload Profile Photo'}
          </label>
        </div>
        {isUploading.profilePhoto && (
          <UploadProgress 
            progress={uploadProgress.profilePhoto}
            fileName="Profile Photo"
          />
        )}
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

  const renderSocialLinks = () => (
    <div className="form-section">
      <h2>Social & Professional Links</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>LinkedIn Profile *</label>
          <input
            type="url"
            value={profileData.linkedIn}
            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            required
          />
        </div>
        <div className="form-group">
          <label>GitHub Profile *</label>
          <input
            type="url"
            value={profileData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
            required
          />
        </div>
        <div className="form-group">
          <label>LeetCode Profile *</label>
          <input
            type="url"
            value={profileData.leetcode}
            onChange={(e) => handleInputChange('leetcode', e.target.value)}
            placeholder="https://leetcode.com/yourusername"
            required
          />
        </div>
        <div className="form-group">
          <label>Portfolio Website *</label>
          <input
            type="url"
            value={profileData.portfolioWebsite}
            onChange={(e) => handleInputChange('portfolioWebsite', e.target.value)}
            placeholder="https://yourportfolio.com"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsAndFiles = () => (
    <div className="form-section">
      <h2>Skills & Documents</h2>
      
     
      <div className="form-group">
        <label>Skills *</label>
        <div className="skills-input">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill and press Add"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <button type="button" onClick={addSkill} className="add-skill-btn">
            Add
          </button>
        </div>
        {profileData.skills.length > 0 && (
          <div className="skills-list">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                <span>{skill}</span>
                <button 
                  type="button" 
                  onClick={() => removeSkill(skill)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

     
      <div className="form-group">
        <label>Upload Certificates (Optional)</label>
        <div className="file-upload">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(e) => {
              handleFileUpload('certificates', Array.from(e.target.files));
            }}
            id="certificates-upload"
            disabled={isUploading.certificates}
          />
          <label htmlFor="certificates-upload" className="file-upload-label">
            {isUploading.certificates ? 'Uploading...' : 'Choose Certificate Files'}
          </label>
        </div>
        
        
        {Object.keys(uploadProgress.certificates).length > 0 && (
          <div className="upload-progress-list">
            {profileData.certificates
              .filter(cert => cert.tempId && uploadProgress.certificates[cert.tempId] !== undefined)
              .map((cert) => (
                <UploadProgress
                  key={cert.tempId}
                  progress={uploadProgress.certificates[cert.tempId] || 0}
                  fileName={cert.name}
                />
              ))}
          </div>
        )}
        
        {profileData.certificates.length > 0 && (
          <div className="uploaded-files">
            {profileData.certificates.map((cert, index) => (
              <div key={index} className="file-item">
                <span>{cert.name}</span>
                <button 
                  type="button" 
                  onClick={() => removeCertificate(index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
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
            onChange={(e) => setNewProject(prev => ({...prev, name: e.target.value}))}
            placeholder="Enter project name"
          />
        </div>
        <div className="form-group">
          <label>Hosted Link</label>
          <input
            type="url"
            value={newProject.hostedLink}
            onChange={(e) => setNewProject(prev => ({...prev, hostedLink: e.target.value}))}
            placeholder="https://your-project.com"
          />
        </div>
        <div className="form-group">
          <label>GitHub Link</label>
          <input
            type="url"
            value={newProject.githubLink}
            onChange={(e) => setNewProject(prev => ({...prev, githubLink: e.target.value}))}
            placeholder="https://github.com/username/project"
          />
        </div>
        <div className="form-group">
          <label>Project Image</label>
          <div className="file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleProjectImageUpload(e.target.files[0])}
              id="project-image-upload"
              disabled={isUploading.projectImages}
            />
            <label htmlFor="project-image-upload" className="file-upload-label">
              {isUploading.projectImages ? 'Uploading...' : (newProject.image ? 'Image uploaded' : 'Choose Project Image')}
            </label>
          </div>
          {Object.keys(uploadProgress.projectImages).length > 0 && (
            <div className="upload-progress-list">
              {Object.entries(uploadProgress.projectImages).map(([tempId, progress]) => (
                <UploadProgress
                  key={tempId}
                  progress={progress}
                  fileName="Project Image"
                />
              ))}
            </div>
          )}
        </div>
        <div className="form-group full-width">
          <label>Project Description *</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
            placeholder="Describe your project..."
            rows="3"
          />
        </div>
      </div>
      
      <button type="button" onClick={addProject} className="add-item-btn">
        + Add Project
      </button>

    
      {profileData.projects.length > 0 && (
        <div className="projects-list">
          {profileData.projects.map((project) => (
            <div key={project.id} className="project-card">
              <button 
                type="button" 
                onClick={() => removeProject(project.id)}
                className="project-remove"
              >
                ×
              </button>
              <div className="project-card-header">
                <div className="project-image-preview">
                  {project.imagePreview ? (
                    <img src={project.imagePreview} alt={project.name} />
                  ) : project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <div className="placeholder">📷</div>
                  )}
                </div>
                <div style={{flex: 1}}>
                  <h4 style={{margin: '0 0 0.5rem 0', color: '#111827'}}>{project.name}</h4>
                  <p style={{margin: '0 0 0.5rem 0', color: '#6B7280', fontSize: '0.9rem'}}>{project.description}</p>
                  {project.hostedLink && (
                    <p style={{margin: '0 0 0.25rem 0', fontSize: '0.8rem'}}>
                      <strong>Live:</strong> {project.hostedLink}
                    </p>
                  )}
                  {project.githubLink && (
                    <p style={{margin: '0', fontSize: '0.8rem'}}>
                      <strong>GitHub:</strong> {project.githubLink}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
            onChange={(e) => setNewEducation(prev => ({...prev, institution: e.target.value}))}
            placeholder="University/College name"
          />
        </div>
        <div className="form-group">
          <label>Degree *</label>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation(prev => ({...prev, degree: e.target.value}))}
            placeholder="Bachelor's, Master's, etc."
          />
        </div>
        <div className="form-group">
          <label>Field of Study</label>
          <input
            type="text"
            value={newEducation.fieldOfStudy}
            onChange={(e) => setNewEducation(prev => ({...prev, fieldOfStudy: e.target.value}))}
            placeholder="Computer Science, Engineering, etc."
          />
        </div>
        <div className="form-group">
          <label>Grade/CGPA</label>
          <input
            type="text"
            value={newEducation.grade}
            onChange={(e) => setNewEducation(prev => ({...prev, grade: e.target.value}))}
            placeholder="3.8/4.0 or 85%"
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={newEducation.startDate}
            onChange={(e) => setNewEducation(prev => ({...prev, startDate: e.target.value}))}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={newEducation.endDate}
            onChange={(e) => setNewEducation(prev => ({...prev, endDate: e.target.value}))}
          />
        </div>
      </div>
      
      <button type="button" onClick={addEducation} className="add-item-btn">
        + Add Education
      </button>

  
      {profileData.education.length > 0 && (
        <div className="dynamic-list">
          {profileData.education.map((edu) => (
            <div key={edu.id} className="list-item">
              <button 
                type="button" 
                onClick={() => removeEducation(edu.id)}
                className="list-item-remove"
              >
                ×
              </button>
              <h4 style={{margin: '0 0 0.5rem 0', color: '#111827'}}>{edu.degree} in {edu.fieldOfStudy}</h4>
              <p style={{margin: '0 0 0.25rem 0', color: '#6B7280', fontWeight: '600'}}>{edu.institution}</p>
              <p style={{margin: '0 0 0.25rem 0', color: '#6B7280', fontSize: '0.9rem'}}>
                {edu.startDate} - {edu.endDate || 'Present'}
              </p>
              {edu.grade && (
                <p style={{margin: '0', color: '#6B7280', fontSize: '0.9rem'}}>
                  <strong>Grade:</strong> {edu.grade}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderExperienceAndAchievements = () => (
    <div className="form-section">
      <h2>Experience & Achievements</h2>
      
     
      <div style={{marginBottom: '2rem'}}>
        <h3 style={{color: '#111827', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Work Experience</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience(prev => ({...prev, company: e.target.value}))}
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) => setNewExperience(prev => ({...prev, position: e.target.value}))}
              placeholder="Job title"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={newExperience.location}
              onChange={(e) => setNewExperience(prev => ({...prev, location: e.target.value}))}
              placeholder="City, Country"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({...prev, startDate: e.target.value}))}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience(prev => ({...prev, endDate: e.target.value}))}
            />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience(prev => ({...prev, description: e.target.value}))}
              placeholder="Describe your role and achievements..."
              rows="3"
            />
          </div>
        </div>
        
        <button type="button" onClick={addExperience} className="add-item-btn">
          + Add Experience
        </button>

        {profileData.experience.length > 0 && (
          <div className="dynamic-list">
            {profileData.experience.map((exp) => (
              <div key={exp.id} className="list-item">
                <button 
                  type="button" 
                  onClick={() => removeExperience(exp.id)}
                  className="list-item-remove"
                >
                  ×
                </button>
                <h4 style={{margin: '0 0 0.5rem 0', color: '#111827'}}>{exp.position}</h4>
                <p style={{margin: '0 0 0.25rem 0', color: '#6B7280', fontWeight: '600'}}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                <p style={{margin: '0 0 0.5rem 0', color: '#6B7280', fontSize: '0.9rem'}}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                {exp.description && (
                  <p style={{margin: '0', color: '#374151', fontSize: '0.9rem', lineHeight: '1.5'}}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

     
      <div>
        <h3 style={{color: '#111827', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Co-curricular Achievements</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Achievement Title *</label>
            <input
              type="text"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement(prev => ({...prev, title: e.target.value}))}
              placeholder="Award/Achievement name"
            />
          </div>
          <div className="form-group">
            <label>Organization</label>
            <input
              type="text"
              value={newAchievement.organization}
              onChange={(e) => setNewAchievement(prev => ({...prev, organization: e.target.value}))}
              placeholder="Issuing organization"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement(prev => ({...prev, date: e.target.value}))}
            />
          </div>
          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              value={newAchievement.description}
              onChange={(e) => setNewAchievement(prev => ({...prev, description: e.target.value}))}
              placeholder="Describe your achievement..."
              rows="3"
            />
          </div>
        </div>
        
        <button type="button" onClick={addAchievement} className="add-item-btn">
          + Add Achievement
        </button>

        {profileData.achievements.length > 0 && (
          <div className="dynamic-list">
            {profileData.achievements.map((ach) => (
              <div key={ach.id} className="list-item">
                <button 
                  type="button" 
                  onClick={() => removeAchievement(ach.id)}
                  className="list-item-remove"
                >
                  ×
                </button>
                <h4 style={{margin: '0 0 0.5rem 0', color: '#111827'}}>{ach.title}</h4>
                {ach.organization && (
                  <p style={{margin: '0 0 0.25rem 0', color: '#6B7280', fontWeight: '600'}}>{ach.organization}</p>
                )}
                {ach.date && (
                  <p style={{margin: '0 0 0.5rem 0', color: '#6B7280', fontSize: '0.9rem'}}>{ach.date}</p>
                )}
                <p style={{margin: '0', color: '#374151', fontSize: '0.9rem', lineHeight: '1.5'}}>
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="form-section">
      <h2>Review Your Profile</h2>
      <div className="review-section">
        <div className="review-card">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Mobile:</strong> {profileData.mobile}</p>
          {profileData.bio && <p><strong>Bio:</strong> {profileData.bio}</p>}
          <p><strong>Profile Photo:</strong> {profileData.profilePhoto ? 'Uploaded to Cloudinary' : 'Not uploaded'}</p>
        </div>

        <div className="review-card">
          <h3>Social Links</h3>
          <p><strong>LinkedIn:</strong> {profileData.linkedIn}</p>
          <p><strong>GitHub:</strong> {profileData.github}</p>
          <p><strong>LeetCode:</strong> {profileData.leetcode}</p>
          <p><strong>Portfolio Website:</strong> {profileData.portfolioWebsite}</p>
        </div>

        <div className="review-card">
          <h3>Skills & Documents</h3>
          <p><strong>Skills:</strong> {profileData.skills.join(', ')}</p>
          <p><strong>Certificates:</strong> {profileData.certificates.length} file(s) uploaded to Cloudinary</p>
        </div>

        <div className="review-card">
          <h3>Projects ({profileData.projects.length})</h3>
          {profileData.projects.length > 0 ? (
            <div className="review-projects">
              {profileData.projects.map((project) => (
                <div key={project.id} className="review-project-card">
                  <h4>{project.name}</h4>
                  <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>{project.description}</p>
                  {project.hostedLink && <p style={{fontSize: '0.8rem', margin: '0'}}><strong>Live:</strong> {project.hostedLink}</p>}
                  {project.githubLink && <p style={{fontSize: '0.8rem', margin: '0'}}><strong>GitHub:</strong> {project.githubLink}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p>No projects added</p>
          )}
        </div>

        <div className="review-card">
          <h3>Education ({profileData.education.length})</h3>
          {profileData.education.length > 0 ? (
            profileData.education.map((edu) => (
              <div key={edu.id} style={{marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB'}}>
                <p><strong>{edu.degree} in {edu.fieldOfStudy}</strong></p>
                <p>{edu.institution}</p>
                <p>{edu.startDate} - {edu.endDate || 'Present'}</p>
                {edu.grade && <p>Grade: {edu.grade}</p>}
              </div>
            ))
          ) : (
            <p>No education added</p>
          )}
        </div>

        <div className="review-card">
          <h3>Experience ({profileData.experience.length})</h3>
          {profileData.experience.length > 0 ? (
            profileData.experience.map((exp) => (
              <div key={exp.id} style={{marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB'}}>
                <p><strong>{exp.position}</strong></p>
                <p>{exp.company} {exp.location && `• ${exp.location}`}</p>
                <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && <p style={{fontSize: '0.9rem'}}>{exp.description}</p>}
              </div>
            ))
          ) : (
            <p>No experience added</p>
          )}
        </div>

        <div className="review-card">
          <h3>Achievements ({profileData.achievements.length})</h3>
          {profileData.achievements.length > 0 ? (
            profileData.achievements.map((ach) => (
              <div key={ach.id} style={{marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB'}}>
                <p><strong>{ach.title}</strong></p>
                {ach.organization && <p>{ach.organization}</p>}
                {ach.date && <p>{ach.date}</p>}
                <p style={{fontSize: '0.9rem'}}>{ach.description}</p>
              </div>
            ))
          ) : (
            <p>No achievements added</p>
          )}
        </div>
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
        {isSignedIn && (
          <button 
            className="post-btn"
            onClick={() => navigate("/post")}
          >
            Post
          </button>
        )}

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