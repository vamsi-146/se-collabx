import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthPages.css';

function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    if (registerError) {
      setRegisterError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Professional title is required";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service and Privacy Policy";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          title: formData.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.message || 'Registration failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem('token', data.token);
      onLogin(data.user);
      navigate('/explore');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Join CollabX</h1>
            <p>Create an account to start collaborating on exciting projects</p>
          </div>

          {registerError && (
            <div className="auth-error-message">
              {registerError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="title">Professional Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. UI Designer, Full Stack Developer, Marketing Specialist"
                className={errors.title ? 'input-error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group checkbox-group">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={errors.agreeTerms ? 'checkbox-error' : ''}
                />
                <label htmlFor="agreeTerms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-alternate">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="auth-sidebar-content">
            <h2>Why Join CollabX?</h2>
            <ul className="benefits-list">
              <li>
                <i className="fas fa-lightbulb"></i>
                <div>
                  <h3>Bring Your Ideas to Life</h3>
                  <p>Find skilled collaborators to help turn your vision into reality</p>
                </div>
              </li>
              <li>
                <i className="fas fa-users"></i>
                <div>
                  <h3>Discover Opportunities</h3>
                  <p>Apply your skills to exciting projects across various industries</p>
                </div>
              </li>
              <li>
                <i className="fas fa-chart-line"></i>
                <div>
                  <h3>Grow Your Network</h3>
                  <p>Connect with like-minded professionals and expand your skillset</p>
                </div>
              </li>
              <li>
                <i className="fas fa-globe"></i>
                <div>
                  <h3>Create Impact</h3>
                  <p>Contribute to projects that make a difference in the world</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
