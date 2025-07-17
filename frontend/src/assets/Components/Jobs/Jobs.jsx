import React, { useState, useEffect, useCallback } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); 
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
    salary: '',
    company: '',
    workMode: ''
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [visitedJobs, setVisitedJobs] = useState(new Set());
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const generateJobs = useCallback(() => {
    const jobTemplates = [
      {
        title: 'React Developer',
        company: 'TechCorp',
        location: 'Bangalore',
        workMode: 'Office',
        experience: '2-4 years',
        salary: '₹8-12 LPA',
        type: 'Full-time',
        skills: ['React', 'JavaScript', 'Node.js'],
        description: 'Looking for an experienced React developer to join our frontend team.',
        platform: 'Unstop',
        postedDate: '2 days ago',
        jobCategory: 'frontend-development'
      },
      {
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        workMode: 'Work from Home',
        experience: '1-3 years',
        salary: '₹6-10 LPA',
        type: 'Full-time',
        skills: ['React', 'Vue.js', 'CSS'],
        description: 'Join our dynamic team as a frontend developer. Remote work available.',
        platform: 'Internshala',
        postedDate: '1 day ago',
        jobCategory: 'frontend-development'
      },
      {
        title: 'Senior React Developer',
        company: 'BigTech Solutions',
        location: 'Delhi',
        workMode: 'Hybrid',
        experience: '4-6 years',
        salary: '₹15-20 LPA',
        type: 'Full-time',
        skills: ['React', 'TypeScript', 'Redux'],
        description: 'Senior position for React development with leadership opportunities.',
        platform: 'LinkedIn',
        postedDate: '3 days ago',
        jobCategory: 'frontend-development'
      },
      {
        title: 'Full Stack Developer',
        company: 'InnovateLabs',
        location: 'Remote',
        workMode: 'Work from Home',
        experience: '3-5 years',
        salary: '₹12-16 LPA',
        type: 'Full-time',
        skills: ['React', 'Node.js', 'MongoDB'],
        description: 'Full stack role with React frontend and Node.js backend. Fully remote position.',
        platform: 'Cutshort',
        postedDate: '1 week ago',
        jobCategory: 'full-stack-development'
      },
      {
        title: 'UI/UX Developer',
        company: 'DesignPro',
        location: 'Mumbai',
        workMode: 'Hybrid',
        experience: '2-3 years',
        salary: '₹7-11 LPA',
        type: 'Full-time',
        skills: ['React', 'Figma', 'CSS'],
        description: 'Creative UI/UX developer role with modern design tools.',
        platform: 'Unstop',
        postedDate: '5 hours ago',
        jobCategory: 'ui-ux-design'
      },
      {
        title: 'React Native Developer',
        company: 'MobileFirst',
        location: 'Remote',
        workMode: 'Work from Home',
        experience: '1-4 years',
        salary: '₹9-14 LPA',
        type: 'Full-time',
        skills: ['React Native', 'JavaScript', 'Redux'],
        description: 'Mobile app development with React Native. Remote-first company.',
        platform: 'LinkedIn',
        postedDate: '3 hours ago',
        jobCategory: 'mobile-development'
      },
      {
        title: 'Frontend Intern',
        company: 'StartupHub',
        location: 'Pune',
        workMode: 'Office',
        experience: '0-1 years',
        salary: '₹15-25k/month',
        type: 'Internship',
        skills: ['React', 'HTML', 'CSS'],
        description: 'Great opportunity for fresh graduates to start their career.',
        platform: 'Internshala',
        postedDate: '1 hour ago',
        jobCategory: 'frontend-development'
      },
      {
        title: 'JavaScript Developer',
        company: 'WebSolutions',
        location: 'Chennai',
        workMode: 'Office',
        experience: '2-5 years',
        salary: '₹10-15 LPA',
        type: 'Full-time',
        skills: ['JavaScript', 'React', 'Express.js'],
        description: 'Backend and frontend JavaScript development role.',
        platform: 'Cutshort',
        postedDate: '6 hours ago',
        jobCategory: 'full-stack-development'
      },
      {
        title: 'Backend Developer',
        company: 'DataTech',
        location: 'Hyderabad',
        workMode: 'Office',
        experience: '3-5 years',
        salary: '₹12-18 LPA',
        type: 'Full-time',
        skills: ['Node.js', 'Python', 'AWS'],
        description: 'Backend development with modern cloud technologies.',
        platform: 'Unstop',
        postedDate: '4 hours ago',
        jobCategory: 'backend-development'
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudSolutions',
        location: 'Remote',
        workMode: 'Work from Home',
        experience: '4-6 years',
        salary: '₹16-22 LPA',
        type: 'Full-time',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        description: 'DevOps role with focus on cloud infrastructure and automation.',
        platform: 'LinkedIn',
        postedDate: '2 days ago',
        jobCategory: 'devops'
      }
    ];

    return jobTemplates.map((job, index) => ({
      ...job,
      id: Date.now() + index,
      postedDate: getRandomRecentTime()
    }));
  }, []);

  const getRandomRecentTime = () => {
    const times = ['1 hour ago', '3 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 days ago'];
    return times[Math.floor(Math.random() * times.length)];
  };

 
  const generatePlatformUrl = (job) => {
    const { platform, jobCategory, workMode, type, title, location } = job;
    
    try {
      if (platform === 'Internshala') {
       
        if (type === 'Internship') {
          const workModePrefix = workMode === 'Work from Home' ? 'work-from-home-' : '';
          const categoryPath = `${jobCategory.replace('-', '-')}-internship`;
          return `https://internshala.com/internships/${workModePrefix}${categoryPath}`;
        } else {
       
          const workModePrefix = workMode === 'Work from Home' ? 'work-from-home-' : '';
          const categoryPath = `${jobCategory.replace('-', '-')}-jobs`;
          return `https://internshala.com/jobs/${workModePrefix}${categoryPath}`;
        }
      } 
      
      else if (platform === 'LinkedIn') {
     
        const searchTerm = encodeURIComponent(title.split(' ')[0]); 
        const locationParam = workMode === 'Work from Home' ? 'Remote' : encodeURIComponent(location);
        return `https://www.linkedin.com/jobs/search/?keywords=${searchTerm}&location=${locationParam}`;
      } 
      
      else if (platform === 'Cutshort') {
     
        const categoryPath = jobCategory.replace('-', '-');
        const workModeFilter = workMode === 'Work from Home' ? '-remote' : '';
        return `https://cutshort.io/jobs/${categoryPath}${workModeFilter}`;
      } 
      
      else if (platform === 'Unstop') {
     
        return 'https://unstop.com/job-portal';
      }
      
  
      const fallbackUrls = {
        'Internshala': 'https://internshala.com/jobs/',
        'LinkedIn': 'https://www.linkedin.com/jobs/',
        'Cutshort': 'https://cutshort.io/profile/all-jobs',
        'Unstop': 'https://unstop.com/job-portal'
      };
      
      return fallbackUrls[platform] || 'https://www.google.com/search?q=jobs';
      
    } catch {
  
      const fallbackUrls = {
        'Internshala': 'https://internshala.com/jobs/',
        'LinkedIn': 'https://www.linkedin.com/jobs/',
        'Cutshort': 'https://cutshort.io/profile/all-jobs',
        'Unstop': 'https://unstop.com/job-portal'
      };
      
      return fallbackUrls[platform] || 'https://www.google.com/search?q=jobs';
    }
  };


  useEffect(() => {
    const fetchJobs = () => {
      setLoading(true);
      setTimeout(() => {
        setJobs(generateJobs());
        setLoading(false);
      }, 1000);
    };

    fetchJobs();

 
    const interval = setInterval(() => {
      const newJob = generateJobs()[Math.floor(Math.random() * 10)];
      setJobs(prev => [{ ...newJob, id: Date.now() }, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, [generateJobs]);

  const filterJobs = useCallback(() => {
    let filtered = jobs;

   
    if (activeTab === 'bookmarked') {
      filtered = jobs.filter(job => bookmarkedJobs.has(job.id));
    } else if (activeTab === 'visited') {
      filtered = jobs.filter(job => visitedJobs.has(job.id));
    }

   
    filtered = filtered.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !filters.location || 
                             job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                             (filters.location.toLowerCase() === 'remote' && job.workMode === 'Work from Home');
      const matchesExperience = !filters.experience || job.experience === filters.experience;
      const matchesJobType = !filters.jobType || job.type === filters.jobType;
      const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode;
  
      return matchesSearch && matchesLocation && matchesExperience && matchesJobType && matchesCompany && matchesWorkMode;
    });
    
    setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs, activeTab, bookmarkedJobs, visitedJobs]);
  
  useEffect(() => {
    filterJobs();
  }, [filterJobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Searching for:", searchTerm);
  
  };
  

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
      } else {
        newBookmarks.add(jobId);
      }
      return newBookmarks;
    });
  };

  const applyToJob = (job) => {
    setVisitedJobs(prev => new Set([...prev, job.id]));
  
    const platformUrl = generatePlatformUrl(job);
    console.log(`Redirecting to: ${platformUrl}`); 
    window.open(platformUrl, '_blank');
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      experience: '',
      jobType: '',
      salary: '',
      company: '',
      workMode: ''
    });
  };

  const getTabCounts = () => {
    return {
      all: jobs.length,
      bookmarked: bookmarkedJobs.size,
      visited: visitedJobs.size
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="jobs-container">
    
      <div className="header-section">
        <div className="header-content">
          <h1 className="main-heading">Find Your Dream Job</h1>
          <p className="header-subtitle">Discover amazing opportunities from top companies</p>
        </div>
      </div>

      
<div className="search-section">
  <div className="search-container">
    <form className="search-barr" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for jobs, companies, or skills..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        aria-label="Search jobs"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </form>
  </div>
</div>


      <div className="jobs-content">
      
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">Clear All</button>
          </div>

      
          <div className="tabs-section">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            >
              All Jobs ({tabCounts.all})
            </button>
            <button
              onClick={() => setActiveTab('bookmarked')}
              className={`tab-button ${activeTab === 'bookmarked' ? 'active' : ''}`}
            >
              Bookmarked ({tabCounts.bookmarked})
            </button>
            <button
              onClick={() => setActiveTab('visited')}
              className={`tab-button ${activeTab === 'visited' ? 'active' : ''}`}
            >
              Visited ({tabCounts.visited})
            </button>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
            >
              <option value="">All Experience Levels</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="2-4 years">2-4 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="4-6 years">4-6 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Job Type</label>
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Work Mode</label>
            <select
              value={filters.workMode}
              onChange={(e) => handleFilterChange('workMode', e.target.value)}
            >
              <option value="">All Work Modes</option>
              <option value="Office">Office</option>
              <option value="Work from Home">Work from Home</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Company</label>
            <input
              type="text"
              placeholder="Company name"
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            />
          </div>
        </div>

    
        <div className="job-listings">
          <div className="results-header">
            <h2>
              {activeTab === 'all' && 'All Jobs'}
              {activeTab === 'bookmarked' && 'Bookmarked Jobs'}
              {activeTab === 'visited' && 'Visited Jobs'}
              ({filteredJobs.length}) 
              {loading && <span className="loading-indicator">🔄</span>}
            </h2>
            {searchTerm && (
              <p>Showing results for "{searchTerm}"</p>
            )}
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching latest jobs...</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-header">
                      <div className="job-title-section">
                        <h3>{job.title}</h3>
                        <p className="company-name">{job.company}</p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`bookmark-btn ${bookmarkedJobs.has(job.id) ? 'bookmarked' : ''}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={bookmarkedJobs.has(job.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="job-details">
                      <div className="job-meta">
                        <span className="location">📍 {job.location}</span>
                        <span className="work-mode">
                          {job.workMode === 'Work from Home' ? '🏠' : job.workMode === 'Hybrid' ? '🔄' : '🏢'} {job.workMode}
                        </span>
                        <span className="experience">💼 {job.experience}</span>
                        <span className="salary">💰 {job.salary}</span>
                      </div>

                      <div className="job-skills">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>

                      <p className="job-description">{job.description}</p>

                      <div className="job-footer">
                        <div className="job-info">
                          <span className="platform">via {job.platform}</span>
                          <span className="posted-date">{job.postedDate}</span>
                        </div>
                        <button
                          onClick={() => applyToJob(job)}
                          className={`apply-btn ${visitedJobs.has(job.id) ? 'visited' : ''}`}
                          disabled={visitedJobs.has(job.id)}
                        >
                          {visitedJobs.has(job.id) ? 'Visited' : 'Apply Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <h3>
                    {activeTab === 'bookmarked' ? 'No bookmarked jobs' : 
                     activeTab === 'visited' ? 'No visited jobs' : 'No jobs found'}
                  </h3>
                  <p>
                    {activeTab === 'bookmarked' ? 'Start bookmarking jobs to see them here' : 
                     activeTab === 'visited' ? 'Jobs you apply to will appear here' : 
                     'Try adjusting your search terms or filters'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;