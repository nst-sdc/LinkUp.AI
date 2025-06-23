import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      console.log('Registered:', form);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="form" id="signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <div className="error-box">{error}</div>}
      <div className="adjacent">
        <div className="field">
          <label>First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
      </div>
     
        <div className="field">
          <label>User Name</label>
          <input type="text" name="userName" value={form.userName} onChange={handleChange} required />
        </div>
      <div className="adjacent">
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        </div>
      </div>

        <div className="field">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
      

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating Account...' : "Let's Go"}
        </button>
      </form>
    </div>
  );
}

export default Signup;