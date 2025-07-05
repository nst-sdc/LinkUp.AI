import React, { useState } from "react";
import "./Internships.css";

const Internships = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      window.open(
        `https://internshala.com/internships/keywords-${encodedQuery}/`,
        "_blank"
      );
    }
  };

  const quotes = [
    "Internships are the bridge between education and employment.",
    "Experience is the best teacher, internships offer just that.",
    "An internship is a trial run for your dream career.",
    "Every professional was once an intern.",
    "Internships build confidence, skills, and connections.",
  ];

  return (
    <div className="intern-internships-wrapper">
      <h1 className="intern-internship-title">Explore Internships</h1>

      <div className="intern-quotes-top">
        {quotes.slice(0, 3).map((quote, idx) => (
          <div className={`intern-quote-shape intern-shape-${idx + 1}`} key={idx}>
            {quote}
          </div>
        ))}
      </div>

      <div className="intern-internship-search-bar">
        <input
          type="text"
          placeholder="Search internships e.g. React Developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="intern-quotes-bottom">
        {quotes.slice(3, 5).map((quote, idx) => (
          <div className={`intern-quote-shape intern-shape-${idx + 4}`} key={idx + 3}>
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;