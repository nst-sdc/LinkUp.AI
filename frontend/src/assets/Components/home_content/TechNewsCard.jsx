import React from 'react';
import './TechNewsCard.css';


export default function TechNewsCard(props) {
 return (
   <div className="news-card">
     {props.image && (
       <div className="news-image-container">
         <img className="news-image" src={props.image} alt="news" />
       </div>
     )}
     <div className="news-content">
       <h3 className="news-title">{props.title}</h3>
       <p className="news-description">{props.description}</p>
       <a href={props.link} target="_blank" rel="noopener noreferrer" className="news-link">
         Read more
         <svg className="link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
           <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
       </a>
     </div>
   </div>
 );
}

