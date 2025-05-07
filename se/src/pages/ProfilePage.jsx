import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

function ProfilePage({ currentUser }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Simulated profile data fetch
  useEffect(() => {
    // In a real app, fetch from API using the id
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockProfile = {
        id: id,
        name: "Alex Johnson",
        title: "Full Stack Developer & UX Designer",
        avatar: "/images/avatars/profile-1.jpg",
        location: "San Francisco, CA",
        bio: "Passionate about creating intuitive user experiences and building scalable web applications. Looking to collaborate on innovative projects in fintech and healthcare.",
        skills: ["JavaScript", "React", "Node.js", "UI/UX Design", "Python", "AWS"],
        experience: [
          { 
            id: 1, 
            role: "Senior Developer", 
            company: "TechSolutions Inc.", 
            period: "2020 - Present",
            description: "Lead front-end development for client projects and mentored junior developers."
          },
          { 
            id: 2, 
            role: "UX Designer", 
            company: "DesignHub", 
            period: "2018 - 2020",
            description: "Created user-centered designs for web and mobile applications."
          }
        ],
        education: [
          {
            id: 1,
            degree: "M.S. Computer Science",
            institution: "Stanford University",
            year: "2018"
          }
        ],
        socialLinks: {
          linkedin: "https://linkedin.com/in/alexjohnson",
          github: "https://github.com/alexj",
          portfolio: "https://alexjohnson.dev"
        }
      };
      
      const mockProjects = [
        {
          id: "1",
          title: "HealthTracker App",
          description: "A mobile application that helps users track their health metrics and medication schedules.",
          tags: ["React Native", "Firebase", "Healthcare"],
          image: "/images/projects/health-tracker.jpg",
          collaborators: 4,
          status: "In Progress"
        },
        {
          id: "2",
          title: "FinBudget Platform",
          description: "A financial budgeting tool that helps users manage expenses and save for goals.",
          tags: ["React", "Node.js", "MongoDB", "FinTech"],
          image: "/images/projects/finbudget.jpg",
          collaborators: 3,
          status: "Completed"
        }
      ];
      
      setProfile(mockProfile);
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }
  
  if (!profile) {
    return <div className="profile-error">Profile not found</div>;
  }
  
  const isOwnProfile = currentUser && currentUser.id === id;
  
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover-photo"></div>
        <div className="profile-header-content">
          <div className="profile-avatar">
            <img src={profile.avatar || '/images/avatars/default.jpg'} alt={profile.name} />
          </div>
          <div className="profile-info">
            <div className="profile-name-section">
              <h1>{profile.name}</h1>
              <span className="profile-title">{profile.title}</span>
              <div className="profile-location">
                <i className="fas fa-map-marker-alt"></i> {profile.location}
              </div>
            </div>
            {isOwnProfile && (
              <div className="profile-actions">
                <button className="btn btn-outline">Edit Profile</button>
              </div>
            )}
            {!isOwnProfile && (
              <div className="profile-actions">
                <button className="btn btn-primary">Connect</button>
                <button className="btn btn-outline">Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="profile-body">
        <div className="profile-sidebar">
          <div className="profile-section">
            <h3>About</h3>
            <p>{profile.bio}</p>
          </div>
          
          <div className="profile-section">
            <h3>Skills</h3>
            <div className="profile-skills">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="profile-section">
            <h3>Social Links</h3>
            <div className="profile-social-links">
              {profile.socialLinks.linkedin && (
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              )}
              {profile.socialLinks.github && (
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i> GitHub
                </a>
              )}
              {profile.socialLinks.portfolio && (
                <a href={profile.socialLinks.portfolio} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-globe"></i> Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="profile-main">
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button 
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
          </div>
          
          <div className="profile-tab-content">
            {activeTab === 'projects' && (
              <div className="profile-projects">
                {projects.length > 0 ? (
                  <div className="projects-grid">
                    {projects.map(project => (
                      <Link to={`/project/${project.id}`} key={project.id} className="project-card">
                        <div className="project-image">
                          <img src={project.image || '/images/projects/default.jpg'} alt={project.title} />
                          <div className="project-status">{project.status}</div>
                        </div>
                        <div className="project-details">
                          <h3>{project.title}</h3>
                          <p>{project.description.substring(0, 100)}...</p>
                          <div className="project-tags">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="project-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="project-collaborators">
                            <i className="fas fa-users"></i> {project.collaborators} collaborators
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>No projects yet.</p>
                    {isOwnProfile && (
                      <Link to="/create-project" className="btn btn-primary">Create a Project</Link>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'experience' && (
              <div className="profile-experience">
                {profile.experience.length > 0 ? (
                  <div className="timeline">
                    {profile.experience.map(exp => (
                      <div key={exp.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h3>{exp.role}</h3>
                          <div className="timeline-meta">
                            <span className="company">{exp.company}</span>
                            <span className="period">{exp.period}</span>
                          </div>
                          <p>{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>No experience listed yet.</p>
                    {isOwnProfile && (
                      <button className="btn btn-outline">Add Experience</button>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="profile-education">
                {profile.education.length > 0 ? (
                  <div className="timeline">
                    {profile.education.map(edu => (
                      <div key={edu.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h3>{edu.degree}</h3>
                          <div className="timeline-meta">
                            <span className="institution">{edu.institution}</span>
                            <span className="year">{edu.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>No education listed yet.</p>
                    {isOwnProfile && (
                      <button className="btn btn-outline">Add Education</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;