import React from 'react';
import './UploadProgress.css';

const UploadProgress = ({ progress, fileName, onCancel }) => {
  return (
    <div className="upload-progress">
      <div className="upload-progress-header">
        <span className="upload-filename">{fileName}</span>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="upload-cancel-btn"
          >
            ×
          </button>
        )}
      </div>
      <div className="upload-progress-bar">
        <div 
          className="upload-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="upload-progress-text">
        Upload: {progress}%
      </div>
    </div>
  );
};

export default UploadProgress;
