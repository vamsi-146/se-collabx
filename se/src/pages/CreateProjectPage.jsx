import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateProjectPage.css';

function CreateProjectPage({ currentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    skills: [],
    rolesNeeded: [],
    timeline: '',
    visibility: 'public',
    image: null,
    imagePreview: null
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories = [
    'Technology', 'Design', 'Business', 'Arts', 'Education', 
    'Healthcare', 'Science', 'Environment', 'Social Impact', 'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear image error if it exists
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: null
        }));
      }
    }
  };
  
  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
      
      // Clear skills error if it exists
      if (errors.skills) {
        setErrors(prev => ({
          ...prev,
          skills: null
        }));
      }
    }
  };
  
  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  const handleRoleAdd = () => {
    if (roleInput.trim() && !formData.rolesNeeded.includes(roleInput.trim())) {
      setFormData(prev => ({
        ...prev,
        rolesNeeded: [...prev.rolesNeeded, roleInput.trim()]
      }));
      setRoleInput('');
      
      // Clear roles error if it exists
      if (errors.rolesNeeded) {
        setErrors(prev => ({
          ...prev,
          rolesNeeded: null
        }));
      }
    }
  };
  
  const handleRoleRemove = (roleToRemove) => {
    setFormData(prev => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.filter(role => role !== roleToRemove)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Project title is required";
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
    if (formData.rolesNeeded.length === 0) newErrors.rolesNeeded = "At least one role is required";
    if (!formData.timeline.trim()) newErrors.timeline = "Project timeline is required";
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo(0, 0);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the data to your API here
      console.log("Submitting project:", formData);
      
      // Simulate API call success
      setTimeout(() => {
        // Redirect to the newly created project page (with a mock ID)
        navigate('/project/new-project-123');
      }, 1500);
      
    } catch (error) {
      console.error("Error creating project:", error);
      setErrors({
        submit: "There was an error creating your project. Please try again."
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="create-project-page">
      <div className="page-header">
        <h1>Create a New Project</h1>
        <p>Share your vision and find collaborators to make it a reality</p>
      </div>
      
      <div className="create-project-container">
        {errors.submit && (
          <div className="error-message global-error">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="create-project-form">
          <div className="form-section">
            <h2>Project Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Project Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your project a concise, descriptive title"
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="shortDescription">Short Description*</label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="A brief one-line description of your project"
                maxLength="120"
                className={errors.shortDescription ? 'input-error' : ''}
              />
              <div className="character-count">
                {formData.shortDescription.length}/120 characters
              </div>
              {errors.shortDescription && <div className="error-message">{errors.shortDescription}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="fullDescription">Full Description*</label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Provide a detailed description of your project, its goals, and your vision"
                rows="6"
                className={errors.fullDescription ? 'input-error' : ''}
              ></textarea>
              {errors.fullDescription && <div className="error-message">{errors.fullDescription}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'input-error' : ''}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
          </div>
          
          <div className="form-section">
            <h2>Skills & Collaboration</h2>
            
            <div className="form-group">
              <label htmlFor="skills">Required Skills*</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g., JavaScript, Graphic Design, Marketing"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                  className={errors.skills ? 'input-error' : ''}
                />
                <button type="button" onClick={handleSkillAdd} className="btn btn-outline">Add</button>
              </div>
              {errors.skills && <div className="error-message">{errors.skills}</div>}
              
              <div className="tags-container">
                {formData.skills.map(skill => (
                  <div key={skill} className="tag">
                    {skill}
                    <button type="button" onClick={() => handleSkillRemove(skill)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="rolesNeeded">Roles Needed*</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="rolesNeeded"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  placeholder="e.g., Front-end Developer, UI Designer, Project Manager"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleRoleAdd())}
                  className={errors.rolesNeeded ? 'input-error' : ''}
                />
                <button type="button" onClick={handleRoleAdd} className="btn btn-outline">Add</button>
              </div>
              {errors.rolesNeeded && <div className="error-message">{errors.rolesNeeded}</div>}
              
              <div className="tags-container">
                {formData.rolesNeeded.map(role => (
                  <div key={role} className="tag">
                    {role}
                    <button type="button" onClick={() => handleRoleRemove(role)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="timeline">Project Timeline*</label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g., 3 months, Ongoing, Summer 2025"
                className={errors.timeline ? 'input-error' : ''}
              />
              {errors.timeline && <div className="error-message">{errors.timeline}</div>}
            </div>
          </div>
          
          <div className="form-section">
            <h2>Project Media</h2>
            
            <div className="form-group">
              <label htmlFor="projectImage">Project Image</label>
              <div className="image-upload-container">
                <div className="image-upload-area">
                  {formData.imagePreview ? (
                    <div className="image-preview">
                      <img src={formData.imagePreview} alt="Project preview" />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Drag & drop an image or click to browse</p>
                      <span>Recommended size: 1200 x 630 pixels</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="projectImage"
                    name="projectImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="visibility">Project Visibility</label>
              <div className="radio-options">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={handleChange}
                  />
                  <label htmlFor="public">
                    <div className="radio-label">
                      <strong>Public</strong>
                      <span>Visible to all CollabX users</span>
                    </div>
                  </label>
                </div>
                
                <div className="radio-option">
                  <input
                    type="radio"
                    id="private"
                    name="visibility"
                    value="private"
                    checked={formData.visibility === 'private'}
                    onChange={handleChange}
                  />
                  <label htmlFor="private">
                    <div className="radio-label">
                      <strong>Private</strong>
                      <span>Only visible to those you invite</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/explore')}>Cancel</button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectPage;