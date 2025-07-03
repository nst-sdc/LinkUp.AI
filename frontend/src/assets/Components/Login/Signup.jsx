import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { auth, db } from "../../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
 const [googleLoading, setGoogleLoading] = useState(false);


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
 
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );

 
  await setDoc(doc(db, "users", userCredential.user.uid), {
    firstName: form.firstName,
    lastName: form.lastName,
    userName: form.userName,
    email: form.email,
    phone: form.phone,
  });

  navigate("/login");
} catch (err) {
  console.error(err);
  setError("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}
};


const handleGoogleSignup = async () => {
  setGoogleLoading(true);
  setError("");

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

   
    await setDoc(doc(db, "users", user.uid), {
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ")[1] || "",
      userName: user.displayName || "",
      email: user.email,
      phone: user.phoneNumber || "",
    });

   
    navigate("/Home");

  } catch (err) {
    console.error("Google Sign-In Error:", err.message);
    setError("Google sign-in failed. Try again.");
  } finally {
    setGoogleLoading(false);
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
         placeholder="Confirm Password"
       />


       <button
         type="submit"
         className="btn-primary login-btn"
         disabled={loading || googleLoading}
       >
         {loading ? "Creating Account..." : "Let's Go"}
       </button>


       <div className="divider">
         <span>or</span>
       </div>


       <div className="social-buttons">
         <button
           type="button"
           className="social-btn google-btn"
           onClick={handleGoogleSignup}
           disabled={loading || googleLoading}
         >
           <svg className="social-icon" viewBox="0 0 24 24">
             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
           </svg>
           {googleLoading ? "Connecting..." : "Continue with Google"}
         </button>
       </div>


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