import React, { useState } from 'react';
import './BioGenerator.css';


export default function BioGenerator() {
  const [userInput, setUserInput] = useState('');
  const [bioResult, setBioResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    if (!userInput.trim()) {
      alert("Please enter something about yourself.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', 
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'AI Bio Generator',          
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct', 
          messages: [
            { role: 'system', content: 'You are a professional bio writer.' },
            { role: 'user', content: `Create a short, professional bio for: "${userInput}"` }
          ],
          temperature: 0.7,
          max_tokens: 100,
        })
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        alert('Error from OpenRouter: ' + data.error.message);
      } else {
        setBioResult(data.choices[0]?.message?.content.trim() || 'No bio generated.');
      }
    } catch (error) {
      console.error(error);
      alert("Network error while generating bio.");
    } finally {
      setLoading(false);
    }
  };

  const writeYourself = () => {
    setBioResult(userInput);
  };

  return (
    <div className="bio-wrapper">
       <div className="sec">
        <div className="text">
          <h1>AI Bio Generator</h1>
          <p>"Let Artificial Intelligence Tell Your Story — with Power, Precision, and Style."</p>
        </div>
      </div> 

      <div className="bio-box">
        <textarea
          className="bio-textarea"
          placeholder="Tell us something about yourself..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          rows={6}
          disabled={loading}
        />

        <div className="button-group">
          <button className="btn write-btn" onClick={writeYourself} disabled={loading}>
            Write Yourself
          </button>
          <button className="btn ai-btn" onClick={generateBio} disabled={loading}>
            {loading ? 'Generating...' : 'Create using AI'}
          </button>
          <button
            className="btn clear-btn"
            onClick={() => {
              setUserInput('');
              setBioResult('');
            }}
            disabled={loading}
          >
            Clear
          </button>
        </div>

        {bioResult && (
          <div className="generated-bio">
            <h4>Your Bio:</h4>
            <p>{bioResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

