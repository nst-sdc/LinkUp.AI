import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");

    if (!resetEmail) {
      setResetMessage("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset link sent to your email!");
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail("");
        setResetMessage("");
      }, 3000);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setResetMessage("No user found with this email.");
      } else if (err.code === 'auth/invalid-email') {
        setResetMessage("Invalid email address.");
      } else {
        setResetMessage("Error sending reset email. Please try again.");
      }
    }
  };

  if (showForgotPassword) {
    return (
      <div className="login">
        <form className="login-form forgot-password-form" onSubmit={handleForgotPassword}>
          <h2 className="login-header">Reset Password</h2>
          <p className="forgot-description">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {resetMessage && (
            <div className={`message-box ${resetMessage.includes('sent') ? 'success' : 'error'}`}>
              {resetMessage}
            </div>
          )}

          <input
            type="email"
            className="login-input"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <button className="btn-primary login-btn" type="submit">
            Send Reset Link
          </button>

          <button
            type="button"
            className="back-to-login"
            onClick={() => {
              setShowForgotPassword(false);
              setResetEmail("");
              setResetMessage("");
            }}
          >
            ← Back to Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

