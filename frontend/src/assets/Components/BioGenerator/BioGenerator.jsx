import { useState, useEffect } from 'react';
import './BioGenerator.css';

export default function BioGenerator() {
  const [userInput, setUserInput] = useState('');
  const [bioResult, setBioResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateBio = async () => {
    if (!userInput.trim()) {
      setError("Please enter something about yourself.");
      return;
    }

    setLoading(true);
    setError(null);
    setBioResult('');

    try {
      const prompt = `Write a concise, professional LinkedIn bio in 50 words or less. Use clear and simple language. Here is some info: ${userInput}`;

      const response = await fetch('http://localhost:4000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setBioResult(data.response.trim());
      } else {
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Server error. Please check backend connection.");
    }

    setLoading(false);
  };

  const clearFields = () => {
    setUserInput('');
    setBioResult('');
    setError(null);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bioResult);
      alert("Bio copied to clipboard successfully!");
    } catch{
      alert("Unable to copy to clipboard.");
    }
  };

  const regenerateBio = () => {
    generateBio();
  };

  const wordCount = bioResult.split(' ').filter(word => word.length > 0).length;
  const charCount = bioResult.length;

  return (
    <div className="bio-wrapper">
      <section className="bio-hero">
        <div className="bio-hero-container">
          <div className={`bio-hero-content ${mounted ? 'fade-in' : ''}`}>
            <h1 className="bio-hero-title">
              AI Bio Generator
            </h1>
            <p className="bio-hero-description">
              Let Artificial Intelligence Tell Your Story — with{" "}
              <span className="bio-text-primary">Power</span>,{" "}
              <span className="bio-text-secondary">Precision</span>, and{" "}
              <span className="bio-text-accent">Style</span>.
            </p>
            <div className="bio-hero-features">
              <div className="bio-hero-feature">
                <span>Instantly Generated</span>
              </div>
              <div className="bio-hero-feature">
                <span>Your Privacy Matters</span>
              </div>
              <div className="bio-hero-feature">
                <span>Seamless on All Devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bio-form-section">
        <div className="bio-form-container">
          <div className={`bio-card ${mounted ? 'slide-in' : ''}`}>
            <div className="bio-card-header">
              <h2 className="bio-card-title">Create Your Professional Bio</h2>
              <p className="bio-card-description">Tell us about yourself and let AI craft the perfect bio for you</p>
            </div>

            <div className="bio-card-content">
              <div className="bio-form-group">
                <div className="bio-form-field">
                  <label htmlFor="user-input" className="bio-label">
                    Tell us about yourself
                    <span className="bio-label-hint"> (The more details you provide, the better your bio will be)</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      id="user-input"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="bio-textarea"
                      placeholder="Example: I'm a software engineer with 5 years of experience in web development..."
                      disabled={loading}
                    />
                    <div className="bio-char-count">
                      {userInput.length}/2000
                    </div>
                  </div>
                </div>

                <div className="bio-button-group">
                  <button
                    onClick={generateBio}
                    disabled={loading}
                    className="bio-btn bio-btn-primary"
                  >
                    {loading ? (
                      <>
                        <div className="bio-spinner"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        Create using AI
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearFields}
                    disabled={loading}
                    className="bio-btn bio-btn-secondary"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {loading && (
                <div className="bio-loading fade-in">
                  <div className="bio-loading-content">
                    <div className="bio-spinner"></div>
                    <span className="bio-loading-text">Generating your bio...</span>
                  </div>
                  <div className="bio-progress">
                    <div className="bio-progress-bar">
                      <div className="bio-progress-fill"></div>
                    </div>
                    <p className="bio-progress-text">This usually takes 3-5 seconds</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bio-error slide-in">
                  <div className="bio-error-content">
                    <div className="bio-error-icon">⚠️</div>
                    <div>
                      <h4 className="bio-error-title">Generation Failed</h4>
                      <p className="bio-error-message">{error}</p>
                      <button
                        onClick={generateBio}
                        className="bio-error-retry"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {bioResult && (
                <div className="bio-result slide-in">
                  <div className="bio-result-card">
                    <div className="bio-result-header">
                      <h3 className="bio-result-title">
                        <div className="bio-result-icon">AI</div>
                        Your Generated Bio
                      </h3>
                      <div className="bio-result-actions">
                        <button
                          onClick={copyToClipboard}
                          className="bio-btn-small bio-btn-small-primary"
                        >
                          Copy
                        </button>
                        <button
                          onClick={regenerateBio}
                          className="bio-btn-small bio-btn-small-outline"
                        >
                          Regenerate
                        </button>
                      </div>
                    </div>
                    <div className="bio-result-content">
                      <div>
                        <p className="bio-result-text">
                          {bioResult}
                        </p>
                      </div>
                      
                      <div className="bio-stats">
                        <div className="bio-stat">
                          <div className="bio-stat-number bio-stat-primary">{wordCount}</div>
                          <div className="bio-stat-label">Words</div>
                        </div>
                        <div className="bio-stat">
                          <div className="bio-stat-number bio-stat-secondary">{charCount}</div>
                          <div className="bio-stat-label">Characters</div>
                        </div>
                        <div className="bio-stat">
                          <div className="bio-stat-number bio-stat-accent">4.8</div>
                          <div className="bio-stat-label">Quality Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bio-features">
        <div className="bio-features-container">
          <div className={`bio-features-header ${mounted ? 'fade-in' : ''}`}>
            <h2 className="bio-features-title">Why Choose Our AI Bio Generator?</h2>
            <p className="bio-features-description">Powered by advanced AI technology to create professional, engaging bios tailored to your needs</p>
          </div>
          
          <div className="bio-features-grid">
            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-1' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Instantly Generated</h3>
              <p className="bio-feature-description">Generate professional bios in seconds with our high-speed AI engine.</p>
            </div>

            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-2' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Versatile Tone Options</h3>
              <p className="bio-feature-description">From professional to creative, our AI adapts to your desired voice.</p>
            </div>

            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-3' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Your Privacy Matters</h3>
              <p className="bio-feature-description">No data is stored. Everything is processed securely and deleted instantly.</p>
            </div>

            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-4' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Seamless on All Devices</h3>
              <p className="bio-feature-description">Fully responsive and mobile-friendly for bios on the go.</p>
            </div>

            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-5' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h4"/>
                  <path d="M15 11h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4"/>
                  <path d="M12 2v9"/>
                  <path d="M9 7l3-3 3 3"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Standout Professionalism</h3>
              <p className="bio-feature-description">Create LinkedIn-ready bios that highlight your skills and personality.</p>
            </div>

            <div className={`bio-feature-card ${mounted ? 'slide-in-delay-6' : ''}`}>
              <div className="bio-feature-icon bio-feature-icon-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3 className="bio-feature-title">Tailored to Your Needs</h3>
              <p className="bio-feature-description">Personalize your bio for different platforms with smart suggestions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}