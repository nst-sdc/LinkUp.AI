import React, { useState } from "react";
import "./internships.css";

const Internships = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      window.open(`https://internshala.com/internships/keywords-${encodedQuery}/`, "_blank");
    }
  };

  const quotes = [
    "Internships are the bridge between education and employment.",
    "Experience is the best teacher, internships offer just that.",
    "An internship is a trial run for your dream career.",
    "Every professional was once an intern.",
    "Internships build confidence, skills, and connections.",
    "Start where you are. Use what you have. Do what you can.",
    "Your career begins with a single internship.",
    "Internships are investments in your future.",
    "Learn by doing — internships make it real.",
    "Opportunities don’t happen, you create them — start with an internship."
  ];

  return (
    <div className="internships-wrapper">
      <h1 className="internship-title">Explore Internships</h1>
      <div className="internship-search-bar">
        <input
          type="text"
          placeholder="Search internships e.g. React Developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="quotes-container">
        {quotes.map((quote, idx) => (
          <div className={`quote-shape shape-${(idx % 5) + 1}`} key={idx}>
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
