import axios from 'axios';
import { CLOUDINARY_CONFIG } from './cloudinary-config.js';

const CLOUDINARY_CLOUD_NAME = CLOUDINARY_CONFIG.CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = CLOUDINARY_CONFIG.UPLOAD_PRESET;

export const uploadToCloudinary = async (file, onProgress, folder = '') => {
  console.log('Starting Cloudinary upload:', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    folder
  });

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
  if (folder) {
    formData.append('folder', folder);
  }

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      console.error('Response error:', { status, data });
      
      if (status === 400) {
        throw new Error(`Upload failed: ${data.error?.message || 'Invalid upload preset or configuration'}`);
      } else if (status === 401) {
        throw new Error('Upload failed: Authentication error. Please check your Cloudinary configuration.');
      } else if (status === 413) {
        throw new Error('Upload failed: File too large. Please choose a smaller file.');
      } else {
        throw new Error(`Upload failed: Server error (${status}). Please try again.`);
      }
    } else if (error.request) {
      throw new Error('Upload failed: Network error. Please check your internet connection.');
    } else {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
};

export const uploadMultipleToCloudinary = async (files, onProgress, folder = '') => {
  const uploadPromises = files.map((file, index) => {
    return uploadToCloudinary(
      file,
      (progress) => onProgress(index, progress),
      folder
    );
  });

  return Promise.all(uploadPromises);
};