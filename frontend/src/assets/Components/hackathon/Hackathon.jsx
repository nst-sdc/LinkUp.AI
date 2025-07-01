import React, { useState, useEffect } from 'react';
import { Search, Calendar, Users, Trophy, ExternalLink, Star, MapPin, Clock } from 'lucide-react';
import "./Hackathonstyle.css"
import Navbar from "../Navbar/Navbar"
import { Link, useNavigate } from 'react-router-dom';

const Hackathon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const hackathons = [
    {
      id: 1,
      name: "Smart India Hackathon",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "India's biggest hackathon fostering innovation across diverse domains",
      participants: "50K+",
      prize: "₹10L+",
      deadline: "Dec 2024",
      location: "Pan India",
      rating: 4.8,
      tags: ["Government", "Innovation", "Students"],
      difficulty: "Intermediate"
    },
    {
      id: 2,
      name: "GDSC Solution Challenge",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      description: "Build solutions for UN Sustainable Development Goals using Google tech",
      participants: "10K+",
      prize: "$15K",
      deadline: "Mar 2025",
      location: "Global",
      rating: 4.9,
      tags: ["Google", "SDG", "Global"],
      difficulty: "Advanced"
    },
    {
      id: 3,
      name: "ETHGlobal",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      description: "World's largest Ethereum hackathon series building the future of Web3",
      participants: "5K+",
      prize: "$100K+",
      deadline: "Ongoing",
      location: "Multiple Cities",
      rating: 4.7,
      tags: ["Blockchain", "Web3", "Ethereum"],
      difficulty: "Expert"
    }
  ];

const filteredHackathons = hackathons.filter(hackathon => {
  const matchesSearch = 
    hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  const matchesFilter = selectedFilter === 'all' 
    || hackathon.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase());

  return matchesSearch && matchesFilter;
});

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'difficulty-beginner';
      case 'Intermediate': return 'difficulty-intermediate';
      case 'Advanced': return 'difficulty-advanced';
      case 'Expert': return 'difficulty-expert';
      default: return 'difficulty-default';
    }
  };

  const navigate = useNavigate();


  return (
    <>
      <div className="hackathon-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-overlay"></div>
          
          {/* Animated background elements */}
          <div className="hero-decorations">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
          </div>

          <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
            <h1 className="hero-title">
              Hack The
              <span className="hero-highlight"> Future</span>
            </h1>
            <p className="hero-subtitle">
              Join the world's most innovative hackathons and turn your ideas into reality
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <Users size={20} />
                <span>50K+ Participants</span>
              </div>
              <div className="stat-item">
                <Trophy size={20} />
                <span>$1M+ Prizes</span>
              </div>
              <div className="stat-item">
                <Calendar size={20} />
                <span>Year Round</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-card">
              <h2 className="search-title">
                Discover Your Next Challenge
              </h2>
              
              <div className="search-input-container" style={{ position: 'relative' }}>
                <Search className="search-icon" size={24} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search hackathons, technologies, or themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              <div className="filter-buttons">
                {['all', 'blockchain', 'AI', 'web3', 'mobile', 'iot'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Hackathons */}
        <div className="hackathons-section">
          <div className="hackathons-container">
            <h2 className="section-title">
              Featured Hackathons
            </h2>
            <p className="section-subtitle">
              Join these amazing events and showcase your skills
            </p>

            <div className="hackathons-grid">
              {filteredHackathons.map((hackathon, index) => (
                <div
                  key={hackathon.id}
                  className={`hackathon-card ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="card-image-container">
                    <img
                      src={hackathon.image}
                      alt={hackathon.name}
                      className="card-image"
                    />
                    <div className="image-overlay"></div>
                    <div className="card-rating">
                      <Star size={16} className="star-icon" />
                      <span>{hackathon.rating}</span>
                    </div>
                    <div className={`difficulty-badge ${getDifficultyColor(hackathon.difficulty)}`}>
                      {hackathon.difficulty}
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">
                      {hackathon.name}
                    </h3>
                    <p className="card-description">
                      {hackathon.description}
                    </p>

                    <div className="card-tags">
                      {hackathon.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-stats">
                      <div className="stat">
                        <Users size={16} />
                        <span>{hackathon.participants}</span>
                      </div>
                      <div className="stat">
                        <Trophy size={16} />
                        <span>{hackathon.prize}</span>
                      </div>
                      <div className="stat">
                        <Clock size={16} />
                        <span>{hackathon.deadline}</span>
                      </div>
                      <div className="stat">
                        <MapPin size={16} />
                        <span>{hackathon.location}</span>
                      </div>
                    </div>

                    <button className="join-btn">
                      <span>Join Hackathon</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">
              Ready to Build Something Amazing?
            </h2>
            <p className="cta-subtitle">
              Join thousands of developers, designers, and innovators in the ultimate coding challenge
            </p>
            <div className="cta-buttons">
             <button 
  className="cta-btn primary"
  onClick={() => {
    setSearchTerm('');
    setSelectedFilter('all');
  }}
>
  <Calendar size={20} />
  Browse All Events
</button>
              <button className="cta-btn secondary" onClick={() => navigate('/teamform')}>
                <Users size={20} />
                Create Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hackathon;