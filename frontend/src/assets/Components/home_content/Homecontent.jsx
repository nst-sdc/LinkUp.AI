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
    <div className="home-home-container">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-background">
          <div className="home-floating-shapes">
            <div className="home-shape home-shape-1"></div>
            <div className="home-shape home-shape-2"></div>
            <div className="home-shape home-shape-3"></div>
            <div className="home-shape home-shape-4"></div>
          </div>
        </div>
       
        <div className="home-hero-content">
          <div className="home-hero-text">
            <h1 className="home-hero-title">
              Smart Academic Profile Manager
              <span className="home-gradient-text">for Students</span>
            </h1>
            <p className="home-hero-description">
              Build, organize, and showcase your academic journey with AI-powered tools.
              Create stunning portfolios, generate professional resumes, and connect with peers—all in one platform designed for students.
            </p>
            <div className="home-hero-buttons">
              <button className="home-btn-primary" onClick={handleSignUpClick}>
                Start Building Your Profile
              </button>
            </div>
          </div>
         
          <div className="home-hero-visual">
            <div className="home-connection-nodes">
              <div className="home-node home-node-1"></div>
              <div className="home-node home-node-2"></div>
              <div className="home-node home-node-3"></div>
              <div className="home-node home-node-4"></div>
              <div className="home-connection-line home-line-1"></div>
              <div className="home-connection-line home-line-2"></div>
              <div className="home-connection-line home-line-3"></div>
            </div>
          </div>
        </div>
      </section>


      {/* What is LinkUp.AI Section */}
      <section className="home-about-section home-fade-in-section">
        <div className="home-container">
          <div className="home-about-content">
            <div className="home-about-text">
              <h2 className="home-section-title">What is LinkUp.AI?</h2>
              <p className="home-about-description">
                LinkUp.AI is a revolutionary platform that leverages artificial intelligence to create meaningful connections in the digital world. We're transforming how professionals, creators, and innovators discover opportunities, collaborate on projects, and build lasting relationships.
              </p>
              <p className="home-about-description">
                Our advanced AI algorithms analyze your skills, interests, and goals to match you with the perfect collaborators, mentors, and opportunities. Whether you're looking to start a new project, find a co-founder, or expand your professional network, LinkUp.AI makes it effortless.
              </p>
              <div className="home-stats">
                <div className="home-stat">
                  <span className="home-stat-number">10M+</span>
                  <span className="home-stat-label">Active Users</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat-number">500K+</span>
                  <span className="home-stat-label">Successful Matches</span>
                </div>
                <div className="home-stat">
                  <span className="home-stat-number">150+</span>
                  <span className="home-stat-label">Countries</span>
                </div>
              </div>
            </div>
            <div className="home-about-visual">
              <div className="home-ai-brain">
                <div className="home-brain-core"></div>
                <div className="home-neural-network">
                  <div className="home-neuron home-n1"></div>
                  <div className="home-neuron home-n2"></div>
                  <div className="home-neuron home-n3"></div>
                  <div className="home-neuron home-n4"></div>
                  <div className="home-neuron home-n5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="home-features-section home-fade-in-section">
        <div className="home-container">
          <h2 className="home-section-title home-text-center">Core Features for Students</h2>
          <p className="home-section-subtitle home-text-center">
            Discover powerful tools designed specifically for students to build, organize, and showcase their academic journey
          </p>
         
          <div className="home-features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`home-feature-card home-card-${index + 1}`}>
                <div className="home-feature-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
                <h3 className="home-feature-title">{feature.title}</h3>
                <p className="home-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* News Section */}
      <section className="home-news-section home-fade-in-section">
        <div className="home-container">
          <h2 className="home-section-title home-text-center">Latest Tech News</h2>
          <p className="home-section-subtitle home-text-center">
            Stay updated with the latest developments in technology and AI
          </p>
         
          <div className="home-news-container">
            {loading ? (
              <div className="home-loading-container">
                <div className="home-loading-spinner"></div>
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