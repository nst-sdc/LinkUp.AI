import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 
import { auth } from "../../../firebase"; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


function Login({ setIsSignedIn }) {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [showForgotPassword, setShowForgotPassword] = useState(false);
 const [resetEmail, setResetEmail] = useState("");
 const [resetMessage, setResetMessage] = useState("");


 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setIsLoading(true);



try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in user:", userCredential.user);
  
    setIsSignedIn(true);
    navigate("/profile");
  } catch (err) {
    console.error(err);
    setError("Invalid email or password");
  } finally {
    setIsLoading(false);
  }
};


const handleForgotPassword = async (e) => {
  e.preventDefault();
  setResetMessage("");

  if (!resetEmail) {
    setResetMessage("Please enter your email address");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, resetEmail);
    console.log("Password reset email sent to:", resetEmail);
    setResetMessage("Password reset link sent to your email!");
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetEmail("");
      setResetMessage("");
    }, 3000);
  } catch (err) {
    console.error("Error sending password reset email:", err);
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


 return (
   <div className="login">
     <form className="login-form" onSubmit={handleSubmit}>
       <h2 className="login-header">Login</h2>


       {error && <div className="error-message">{error}</div>}


       <input
         type="email"
         className="login-input"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         placeholder="Email"
       />


       <input
         type="password"
         placeholder="Password"
         className="login-input"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />


       <div className="login-options">
         <button
           type="button"
           className="forgot-password-link"
           onClick={() => setShowForgotPassword(true)}
         >
           Forgot Password?
         </button>
       </div>


       <button className="btn-primary login-btn" type="submit" disabled={isLoading}>
         {isLoading ? "Logging in..." : "Login"}
       </button>


       <p className="redirect-link">
         Don't have an account? <Link to="/signup" className="login-link">Sign Up</Link>
       </p>
     </form>
   </div>
 );
}


export default Login
