import React, { useState } from 'react';
import './teamform.css';
import { db } from '../../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';



const TeamForm = () => {
  const [data, setData] = useState({
    teamName: '', projectTitle: '', projectDesc: '', projectCat: '', leaderEmail: '', phone: '', slack: '', members: [{ name: '', email: '', role: '', exp: '' }]
  });

  const roles = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'designer', label: 'UI/UX Designer' },
    { value: 'pm', label: 'Project Manager' },
    { value: 'data', label: 'Data Scientist' },
    { value: 'mobile', label: 'Mobile Developer' }
  ];

  const expLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (2-4 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' }
  ];

  const projectCats = [
    { value: 'web', label: 'Web App' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT' },
    { value: 'game', label: 'Game' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    setData((prev) => ({ ...prev, members: [...prev.members, { name: '', email: '', role: '', exp: '' }] }));
  };

  const removeMember = (i) => {
    if (data.members.length > 1) {
      setData((prev) => ({ ...prev, members: prev.members.filter((_, idx) => idx !== i) }));
    }
  };

  const updateMember = (i, field, value) => {
    setData((prev) => ({ ...prev, members: prev.members.map((m, idx) => idx === i ? { ...m, [field]: value } : m) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const teamData = {
      teamName: data.teamName,
      project: {
        title: data.projectTitle,
        description: data.projectDesc,
        category: data.projectCat
      },
      members: data.members.map((m) => ({
        name: m.name,
        email: m.email,
        role: m.role,
        experience: m.exp
      })),
      contact: {
        email: data.leaderEmail,
        phone: data.phone,
        slack: data.slack
      },
      createdAt: Timestamp.now()
    };
    console.log("📤 Submitting data to Firestore:", teamData);
  
    try {
        const docRef = await addDoc(collection(db, 'teams'), teamData); 
        console.log("Document written with ID: ", docRef.id);            
        alert("Team created successfully!");
      
  
      // Reset form
      setData({
        teamName: '',
        projectTitle: '',
        projectDesc: '',
        projectCat: '',
        leaderEmail: '',
        phone: '',
        slack: '',
        members: [{ name: '', email: '', role: '', exp: '' }]
      });
    } catch (err) {
      console.error("🔥 Firestore Error:", err.code, err.message);
      alert("Failed to create team. Try again.");
    }
  };
  

  return (
    <div className="team-form-container">
      <div className="form-header">
        <h1>Create Your Hackathon Team</h1>
        <p>Build your dream team and bring your ideas to life</p>
      </div>

      <form className="team-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Team Info</h2>
          <div className="form-group">
            <label>Team Name *</label>
            <input type="text" name="teamName" value={data.teamName} onChange={handleChange} placeholder="Team Name" />
          </div>
        </section>

        <section className="form-section">
          <h2>Project Details</h2>
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" name="projectTitle" value={data.projectTitle} onChange={handleChange} placeholder="Project Title" />
          </div>
          <div className="form-group">
            <label>Project Description *</label>
            <textarea name="projectDesc" value={data.projectDesc} onChange={handleChange} placeholder="Project Description" rows="4" />
          </div>
          <div className="form-group">
            <label>Project Category</label>
            <select name="projectCat" value={data.projectCat} onChange={handleChange}>
              <option value="">Select category</option>
              {projectCats.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
            </select>
          </div>
        </section>

        <section className="form-section">
          <h2>Team Members</h2>
          {data.members.map((m, i) => (
            <div key={i} className="member-card">
              <h3>Member {i + 1} {i === 0 && '(You)'}</h3>
              {data.members.length > 1 && (<button type="button" onClick={() => removeMember(i)} className="remove-member-btn">✕</button>)}
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" value={m.name} onChange={(e) => updateMember(i, 'name', e.target.value)} placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={m.email} onChange={(e) => updateMember(i, 'email', e.target.value)} placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={m.role} onChange={(e) => updateMember(i, 'role', e.target.value)}>
                  <option value="">Select role</option>
                  {roles.map((r) => (<option key={r.value} value={r.value}>{r.label}</option>))}
                </select>
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select value={m.exp} onChange={(e) => updateMember(i, 'exp', e.target.value)}>
                  <option value="">Select level</option>
                  {expLevels.map((lvl) => (<option key={lvl.value} value={lvl.value}>{lvl.label}</option>))}
                </select>
              </div>
            </div>
          ))}
          <button type="button" onClick={addMember} className="add-member-btn">➕ Add Member</button>
        </section>

        <section className="form-section">
          <h2>Contact Info</h2>
          <div className="form-group">
            <label>Team Leader Email *</label>
            <input type="email" name="leaderEmail" value={data.leaderEmail} onChange={handleChange} placeholder="leader@example.com" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
          </div>
          <div className="form-group">
            <label>Slack Handle</label>
            <input type="text" name="slack" value={data.slack} onChange={handleChange} placeholder="@yourhandle" />
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Team</button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
