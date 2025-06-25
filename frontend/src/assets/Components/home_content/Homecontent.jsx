import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TechNewsCard from './TechNewsCard';
import './Homecontent.css';


export default function Home() {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();


 const handleSignUpClick = () => {
   navigate('/signup');
 };


 useEffect(() => {
   const getData = async () => {
     try {
       const res = await fetch('https://newsapi.org/v2/everything?q=coding&language=en&sortBy=publishedAt&pageSize=12&apiKey=45e23b431f194cdbbf519e8363a3c211');
       const json = await res.json();
       setData(json.articles);
     } catch (e) {
       console.log('error', e);
     }
     setLoading(false);
   };


   getData();
 }, []);


 const features = [
   {
     icon: "https://img.icons8.com/?size=100&id=4BQ253NEFFli&format=png&color=000000",
     title: "AI-Powered Profile Management",
     description: "Generate compelling bios, build smart resumes, and create project summaries with one click using our advanced AI technology."
   },
   {
     icon: "https://img.icons8.com/?size=100&id=68JfRQiUe1Xi&format=png&color=000000",
     title: "Interactive Portfolio Timeline",
     description: "Track your academic journey with courses, internships, projects, achievements, and certifications in a beautiful visual timeline."
   },
   {
     icon: "https://img.icons8.com/?size=100&id=1609&format=png&color=000000",
     title: "Student Collaboration Hub",
     description: "Connect with coding partners, mentors, and teammates for group projects. Build your network while you learn."
   },
   {
     icon: "https://img.icons8.com/?size=100&id=lquM93tYtWG0&format=png&color=000000",
     title: "Personalized AI Recommendations",
     description: "Discover tailored courses, certifications, internships, and job opportunities based on your learning history and interests."
   },
   {
     icon: "https://img.icons8.com/?size=100&id=121320&format=png&color=000000",
     title: "Smart Resume Builder",
     description: "Convert your academic achievements and experiences into professional, downloadable resumes optimized for student profiles."
   },
   {
     icon: "https://img.icons8.com/?size=100&id=0wUGo16jNLh8&format=png&color=000000",
     title: "Career Prep Assistant",
     description: "Get discovered by recruiters early with optimized profiles and receive guidance on career paths that match your goals."
   }
 ];


 return (
   <div className="home-container">
     {/* Hero Section */}
     <section className="hero-section">
       <div className="hero-background">
         <div className="floating-shapes">
           <div className="shape shape-1"></div>
           <div className="shape shape-2"></div>
           <div className="shape shape-3"></div>
           <div className="shape shape-4"></div>
         </div>
       </div>
      
       <div className="hero-content">
         <div className="hero-text">
           <h1 className="hero-title">
             Smart Academic Profile Manager
             <span className="gradient-text">for Students</span>
           </h1>
           <p className="hero-description">
             Build, organize, and showcase your academic journey with AI-powered tools.
             Create stunning portfolios, generate professional resumes, and connect with peers—all in one platform designed for students.
           </p>
           <div className="hero-buttons">
             <button className="btn-primary" onClick={handleSignUpClick}>
               Start Building Your Profile
             </button>
           </div>
         </div>
        
         <div className="hero-visual">
           <div className="connection-nodes">
             <div className="node node-1"></div>
             <div className="node node-2"></div>
             <div className="node node-3"></div>
             <div className="node node-4"></div>
             <div className="connection-line line-1"></div>
             <div className="connection-line line-2"></div>
             <div className="connection-line line-3"></div>
           </div>
         </div>
       </div>
     </section>


     {/* What is LinkUp.AI Section */}
     <section className="about-section fade-in-section">
       <div className="container">
         <div className="about-content">
           <div className="about-text">
             <h2 className="section-title">What is LinkUp.AI?</h2>
             <p className="about-description">
               LinkUp.AI is a revolutionary platform that leverages artificial intelligence to create meaningful connections in the digital world. We're transforming how professionals, creators, and innovators discover opportunities, collaborate on projects, and build lasting relationships.
             </p>
             <p className="about-description">
               Our advanced AI algorithms analyze your skills, interests, and goals to match you with the perfect collaborators, mentors, and opportunities. Whether you're looking to start a new project, find a co-founder, or expand your professional network, LinkUp.AI makes it effortless.
             </p>
             <div className="stats">
               <div className="stat">
                 <span className="stat-number">10M+</span>
                 <span className="stat-label">Active Users</span>
               </div>
               <div className="stat">
                 <span className="stat-number">500K+</span>
                 <span className="stat-label">Successful Matches</span>
               </div>
               <div className="stat">
                 <span className="stat-number">150+</span>
                 <span className="stat-label">Countries</span>
               </div>
             </div>
           </div>
           <div className="about-visual">
             <div className="ai-brain">
               <div className="brain-core"></div>
               <div className="neural-network">
                 <div className="neuron n1"></div>
                 <div className="neuron n2"></div>
                 <div className="neuron n3"></div>
                 <div className="neuron n4"></div>
                 <div className="neuron n5"></div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>


     {/* Features Section */}
     <section className="features-section fade-in-section">
       <div className="container">
         <h2 className="section-title text-center">Core Features for Students</h2>
         <p className="section-subtitle text-center">
           Discover powerful tools designed specifically for students to build, organize, and showcase their academic journey
         </p>
        
         <div className="features-grid">
           {features.map((feature, index) => (
             <div key={index} className={`feature-card card-${index + 1}`}>
               <div className="feature-icon">
                 <img src={feature.icon} alt={feature.title} />
               </div>
               <h3 className="feature-title">{feature.title}</h3>
               <p className="feature-description">{feature.description}</p>
             </div>
           ))}
         </div>
       </div>
     </section>


     {/* News Section */}
     <section className="news-section fade-in-section">
       <div className="container">
         <h2 className="section-title text-center">Latest Tech News</h2>
         <p className="section-subtitle text-center">
           Stay updated with the latest developments in technology and AI
         </p>
        
         <div className="news-container">
           {loading ? (
             <div className="loading-container">
               <div className="loading-spinner"></div>
               <p>Loading latest news...</p>
             </div>
           ) : (
             data.map((item, i) => (
               <TechNewsCard
                 key={i}
                 title={item.title}
                 description={item.description}
                 link={item.url}
                 image={item.urlToImage}
               />
             ))
           )}
         </div>
       </div>
     </section>
   </div>
 );
}

