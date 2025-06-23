import React from 'react';
import './TechNewsCard.css';

export default function TechNewsCard(props) {
  return (
    <div className="news-card">
      {props.image && (
        <img className="news-image" src={props.image} alt="news" />
      )}
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <a href={props.link} target="_blank">Read more</a>
    </div>
  );
}
