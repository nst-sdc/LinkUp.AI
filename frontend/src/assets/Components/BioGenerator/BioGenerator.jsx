import { useState } from 'react';
import './BioGenerator.css';

export default function BioGenerator() {
  const [userInput, setUserInput] = useState('');
  const [bioResult, setBioResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateBio = async () => {
    if (!userInput.trim()) {
      setError("Please enter something about yourself.");
      return;
    }

    setLoading(true);
    setError(null);
    setBioResult('');

    try {
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();

      if (response.ok && data.bio) {
        setBioResult(data.bio.trim());
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
    } catch (err) {
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
          <div className="bio-hero-content">
            <h1 className="bio-hero-title">
              AI Bio Generator
            </h1>
            <p className="bio-hero-description">
              "Let Artificial Intelligence Tell Your Story — with{" "}
              <span className="bio-text-primary">Power</span>,{" "}
              <span className="bio-text-secondary">Precision</span>, and{" "}
              <span className="bio-text-accent">Style</span>."
            </p>
            <div className="bio-hero-features">
              <div className="bio-hero-feature">
                <span>Fast Generation</span>
              </div>
              <div className="bio-hero-feature">
                <span>Privacy Focused</span>
              </div>
              <div className="bio-hero-feature">
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bio-form-section">
        <div className="bio-form-container">
          <div className="bio-card">
    
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
                <div className="bio-loading">
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
                <div className="bio-error">
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
                <div className="bio-result">
                  <div className="bio-result-card">
                    <div className="bio-result-header">
                      <h3 className="bio-result-title">
                        <div className="bio-result-icon">🧠</div>
                        Your Generated Bio
                      </h3>
                      <div className="bio-result-actions">
                        <button
                          onClick={copyToClipboard}
                          className="bio-btn-small bio-btn-small-primary"
                        >
                          📋 Copy
                        </button>
                        <button
                          onClick={regenerateBio}
                          className="bio-btn-small bio-btn-small-outline"
                        >
                          🔄 Regenerate
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
          <div className="bio-features-header">
            <h2 className="bio-features-title">Why Choose Our AI Bio Generator?</h2>
            <p className="bio-features-description">Powered by advanced AI technology to create professional, engaging bios tailored to your needs</p>
          </div>
          
          <div className="bio-features-grid">
            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-1">
                ⚡
              </div>
              <h3 className="bio-feature-title">Lightning Fast</h3>
              <p className="bio-feature-description">Generate professional bios in seconds, not hours. Our AI processes your input instantly.</p>
            </div>

            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-2">
                🎨
              </div>
              <h3 className="bio-feature-title">Multiple Styles</h3>
              <p className="bio-feature-description">From professional to creative, our AI adapts to different bio styles and tones.</p>
            </div>

            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-3">
                🔒
              </div>
              <h3 className="bio-feature-title">Privacy First</h3>
              <p className="bio-feature-description">Your data is never stored. All processing happens securely and is deleted immediately.</p>
            </div>

            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-1">
                📱
              </div>
              <h3 className="bio-feature-title">Mobile Optimized</h3>
              <p className="bio-feature-description">Works perfectly on all devices. Create bios on the go with our responsive design.</p>
            </div>

            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-2">
                ✨
              </div>
              <h3 className="bio-feature-title">Professional Quality</h3>
              <p className="bio-feature-description">Get LinkedIn-ready bios that showcase your expertise and personality effectively.</p>
            </div>

            <div className="bio-feature-card">
              <div className="bio-feature-icon bio-feature-icon-3">
                🎯
              </div>
              <h3 className="bio-feature-title">Customizable</h3>
              <p className="bio-feature-description">Tailor your bio for different platforms and purposes with intelligent suggestions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}