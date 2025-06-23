import React, { useEffect, useState } from 'react';
import TechNewsCard from './TechNewsCard';
import './TechNewsCard.css';
import Hackathon from '../hackathon/Hackathon';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://newsapi.org/v2/everything?q=coding&language=en&sortBy=publishedAt&pageSize=100&apiKey=45e23b431f194cdbbf519e8363a3c211');
        const json = await res.json();
        setData(json.articles);
      } catch (e) {
        console.log('error', e);
      }
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
    <div className="news-section">
      <div className="news-container">
        {loading ? (
          <p>Loading...</p>
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
    </>
  );
}
