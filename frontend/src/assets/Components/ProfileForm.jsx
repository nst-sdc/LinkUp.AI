import React, { useState } from 'react';

function ProfileForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Data:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose} style={{marginLeft: '1rem'}}>Cancel</button>
    </form>
  );
}

export default ProfileForm; 