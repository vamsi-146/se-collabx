import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Briefcase, Code, Users, Lightbulb, ArrowRight } from 'lucide-react';
import '../styles/HomePage.css';

const testimonials = [
  {
    id: 1,
    text: "CollabX helped me find the perfect technical co-founder for my startup. Within weeks, we secured our first round of funding!",
    name: "Alex Rivera",
    title: "Founder, TechStart",
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 2,
    text: "As a freelance designer, finding meaningful projects was always a challenge. CollabX connected me with visionaries who value my skills.",
    name: "Tiana Johnson",
    title: "UX/UI Designer",
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 3,
    text: "Our non-profit found incredible volunteer developers through CollabX who helped us build our community service platform.",
    name: "Jamal Washington",
    title: "Director, Community First",
    avatar: "/api/placeholder/64/64"
  }
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
        const data = await res.json();
        setFeaturedProjects(data.projects || []);
      } catch (err) {
        console.error('❌ Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Connect. Collaborate. Create.</h1>
          <p className="hero-subtitle">
            Find the perfect partners to bring your ideas to life or join exciting projects that match your skills.
          </p>
          <div className="hero-buttons">
            <Link to="/explore" className="primary-button">Explore Projects</Link>
            <Link to="/create-project" className="secondary-button">Start Your Project</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/600/400" alt="People collaborating" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How CollabX Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon"><Lightbulb size={32} /></div>
            <h3>Share Your Vision</h3>
            <p>Post your project idea or business concept and specify the skills you're looking for.</p>
          </div>
          <div className="step-arrow"><ChevronRight size={24} /></div>
          <div className="step">
            <div className="step-icon"><Users size={32} /></div>
            <h3>Connect with Talent</h3>
            <p>Browse profiles, review portfolios, and connect with professionals who match your needs.</p>
          </div>
          <div className="step-arrow"><ChevronRight size={24} /></div>
          <div className="step">
            <div className="step-icon"><Code size={32} /></div>
            <h3>Collaborate Effectively</h3>
            <p>Use our tools to communicate, track progress, and manage your project together.</p>
          </div>
          <div className="step-arrow"><ChevronRight size={24} /></div>
          <div className="step">
            <div className="step-icon"><Briefcase size={32} /></div>
            <h3>Launch Successfully</h3>
            <p>Turn your vision into reality with the right team supporting your goals.</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <Link to="/explore" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <p>Loading featured projects...</p>
        ) : (
          <div className="projects-grid">
            {featuredProjects.map(project => (
              <div key={project._id} className="project-card">
                <div className="project-header">
                  <span className="project-category">{project.category}</span>
                  <Link to={`/project/${project._id}`} className="project-title">{project.title}</Link>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-skills">
                  {project.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {project.skills.length > 3 && <span className="more-skills">+{project.skills.length - 3}</span>}
                </div>
                <div className="project-footer">
                  <div className="project-owner">
                    <img
                      src={project.owner?.avatar || '/default-avatar.png'}
                      alt={project.owner?.name || 'Project Owner'}
                      className="owner-avatar"
                    />
                    <span className="owner-name">{project.owner?.name || 'Unknown'}</span>
                  </div>
                  <div className="project-stats">
                    <span className="collaborators">{project.collaborators || 0} collaborators</span>
                    <span className="open-roles">{project.openRoles || 0} open roles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}
            >
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Turn Your Vision into Reality?</h2>
          <p>Join thousands of innovators and professionals connecting on CollabX to build the future together.</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-button">Join CollabX</Link>
            <Link to="/explore" className="secondary-button">Browse Projects</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
