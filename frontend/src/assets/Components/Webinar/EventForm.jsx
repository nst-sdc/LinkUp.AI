import { useState } from 'react';
import './EventForm.css';
import { useNavigate } from 'react-router-dom';

import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateEventForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    speaker: '',
    registrationLink: '',
    duration: '',
    maxAttendees: '',
    type: 'live' 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'required';
    if (!formData.description.trim()) newErrors.description = 'required';
    if (!formData.date) newErrors.date = 'required';
    if (!formData.time) newErrors.time = 'required';
    if (!formData.speaker.trim()) newErrors.speaker = 'required';
    if (!formData.registrationLink.trim()) newErrors.registrationLink = 'required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "webinars"), formData);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        speaker: '',
        registrationLink: '',
        duration: '',
        maxAttendees: '',
        type: 'live'
      });
      navigate('/webinar');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => navigate('/webinar')}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="close-btn" onClick={() => navigate('/webinar')}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-section">
            <h3>Event Details</h3>

            <div className="form-group">
              <label htmlFor="title">Event Title <span className="required">*</span></label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter event title" className={errors.title ? 'error' : ''} />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description <span className="required">*</span></label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your event" rows="4" className={errors.description ? 'error' : ''} />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date <span className="required">*</span></label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className={errors.date ? 'error' : ''} />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Time <span className="required">*</span></label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange} className={errors.time ? 'error' : ''} />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="60" />
              </div>

              <div className="form-group">
                <label htmlFor="maxAttendees">Max Attendees</label>
                <input type="number" id="maxAttendees" name="maxAttendees" value={formData.maxAttendees} onChange={handleInputChange} placeholder="100" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type">Webinar Type</label>
              <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                <option value="live">Live</option>
                <option value="recorded">Recorded</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Speaker Information</h3>
            <div className="form-group">
              <label htmlFor="speaker">Speaker Name <span className="required">*</span></label>
              <input type="text" id="speaker" name="speaker" value={formData.speaker} onChange={handleInputChange} placeholder="Enter speaker name" className={errors.speaker ? 'error' : ''} />
              {errors.speaker && <span className="error-message">{errors.speaker}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Registration</h3>
            <div className="form-group">
              <label htmlFor="registrationLink">Registration Link <span className="required">*</span></label>
              <input type="url" id="registrationLink" name="registrationLink" value={formData.registrationLink} onChange={handleInputChange} placeholder="https://example.com/register" className={errors.registrationLink ? 'error' : ''} />
              {errors.registrationLink && <span className="error-message">{errors.registrationLink}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/webinar')} className="cancel-btn">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="submit-btn">{isSubmitting ? 'Creating...' : 'Create Event'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

