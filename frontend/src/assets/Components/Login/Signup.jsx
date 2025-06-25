import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      console.log("Registered:", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup-form" id="signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <div className="error-box">{error}</div>}
        <div className="adjacent">
          <input
            className="signup-input"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
          />
          <input
            className="signup-input"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Last Name"
          />
        </div>

        <input
          className="signup-input"
          type="text"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
          placeholder="User Name"
        />

        <div className="adjacent">
          <input
            className="signup-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />

          <input
            className="signup-input"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <input
          className="signup-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />

        <input
          className="signup-input"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="ConfirmPassword"
        />

        <button
          type="submit"
          className="btn-primary login-btn"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Let's Go"}
        </button>

        <p className="redirect-link">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
