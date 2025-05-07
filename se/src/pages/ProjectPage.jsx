import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, MessageSquare, Share2, Bookmark, Flag, ChevronRight } from 'lucide-react';
import '../styles/ProjectPage.css';

// Demo project data - would come from API in real app
const projectsData = {
  1: {
    id: 1,
    title: "AI-Powered Healthcare Assistant",
    description: "We're building an AI tool that helps healthcare professionals with diagnostics and patient care. Our goal is to reduce diagnostic errors and improve patient outcomes through intelligent analysis of medical data.",
    longDescription: `
      <p>The healthcare industry is facing unprecedented challenges with growing patient numbers and limited resources. Our AI Healthcare Assistant aims to be a supporting tool for healthcare professionals, not to replace their expertise but to enhance it.</p>
      
      <h3>What we're building:</h3>
      <ul>
        <li>A machine learning system that can analyze patient symptoms, medical history, and test results</li>
        <li>An intuitive interface for healthcare professionals to interact with the AI</li>
        <li>A secure database that complies with all healthcare data regulations</li>
        <li>Integration capabilities with existing Electronic Health Record (EHR) systems</li>
      </ul>
      
      <h3>Our progress so far:</h3>
      <p>We've completed the initial data collection and have trained a preliminary model with promising results. We're now working on improving the model's accuracy and developing the front-end interface.</p>
      
      <h3>What we're looking for:</h3>
      <p>We need team members who are passionate about healthcare and technology. Specifically, we're seeking:</p>
    `,
    owner: {
      name: "Dr. Sarah Chen",
      id: "sarah_chen",
      title: "Neurologist & AI Researcher",
      avatar: "/api/placeholder/60/60",
      location: "Boston, MA",
      joinedDate: "January 2024"
    },
    category: "Healthcare",
    skills: ["Machine Learning", "Python", "Healthcare", "Data Science", "UI/UX Design", "Database Security"],
    collaborators: [
      {
        id: "michael_wong",
        name: "Michael Wong",
        title: "ML Engineer",
        avatar: "/api/placeholder/48/48",
        role: "Lead Developer"
      },
      {
        id: "aisha_patel",
        name: "Aisha Patel",
        title: "Data Scientist",
        avatar: "/api/placeholder/48/48",
        role: "Data Modeling"
      },
      {
        id: "james_johnson",
        name: "James Johnson",
        title: "Healthcare Consultant",
        avatar: "/api/placeholder/48/48",
        role: "Domain Expert"
      }
    ],
    openRoles: [
      {
        id: 1,
        title: "Frontend Developer",
        description: "Develop the user interface for healthcare professionals to interact with our AI system.",
        skills: ["React", "JavaScript", "UI/UX", "Healthcare Experience (preferred)"],
        commitment: "Part-time, 10-15 hours/week"
      },
      {
        id: 2,
        title: "Database Specialist",
        description: "Design and implement a secure database system that complies with healthcare regulations.",
        skills: ["PostgreSQL", "Data Security", "HIPAA Compliance", "AWS"],
        commitment: "Part-time, 10-20 hours/week"
      }
    ],
    location: "Remote (with team members primarily in EST)",
    startDate: "February 15, 2025",
    timeline: "12-18 months",
    updates: [
      {
        id: 1,
        author: "sarah_chen",
        date: "April 12, 2025",
        content: "We've completed the first phase of data collection and are now training our model. Looking to bring on a frontend developer soon!"
      },
      {
        id: 2,
        author: "michael_wong",
        date: "April 5, 2025",
        content: "Initial model training shows 78% accuracy. Working on feature engineering to improve results."
      }
    ]
  },
  2: {
    id: 2,
    title: "Sustainable Urban Farming Platform",
    description: "Creating a digital platform to connect urban farmers with resources and local markets.",
    longDescription: `
      <p>Urban farming is a growing movement that's transforming how cities approach food security and sustainability. Our platform aims to support this movement by creating a digital ecosystem for urban farmers to thrive.</p>
      
      <h3>What we're building:</h3>
      <ul>
        <li>A marketplace connecting urban farmers with local consumers and restaurants</li>
        <li>Resource sharing network for equipment, seeds, and knowledge</li>
        <li>Educational content on sustainable farming practices</li>
        <li>Integration with IoT devices for monitoring plant health and automating systems</li>
      </ul>
      
      <h3>Our progress so far:</h3>
      <p>We've completed market research and developed wireframes for the platform. We're currently building the core marketplace functionality and have begun partnerships with several urban farming communities.</p>
    `,
    owner: {
      name: "Marcus Green",
      id: "marcus_green",
      title: "Urban Farming Advocate & Developer",
      avatar: "/api/placeholder/60/60",
      location: "Portland, OR",
      joinedDate: "November 2024"
    },
    category: "Sustainability",
    skills: ["UX/UI Design", "React", "Node.js", "Agriculture", "Mobile Development", "IoT"],
    collaborators: [
      {
        id: "maya_thompson",
        name: "Maya Thompson",
        title: "UX/UI Designer",
        avatar: "/api/placeholder/48/48",
        role: "Lead Designer"
      },
      {
        id: "alex_rivera",
        name: "Alex Rivera",
        title: "Urban Farmer",
        avatar: "/api/placeholder/48/48",
        role: "Subject Matter Expert"
      }
    ],
    openRoles: [
      {
        id: 1,
        title: "Full Stack Developer",
        description: "Help build the marketplace platform with React frontend and Node.js backend.",
        skills: ["React", "Node.js", "MongoDB", "REST APIs"],
        commitment: "Full-time or significant part-time commitment"
      },
      {
        id: 2,
        title: "Mobile Developer",
        description: "Develop companion mobile app for farmers to manage listings and connect with buyers.",
        skills: ["React Native", "Mobile Development", "API Integration"],
        commitment: "Part-time, 15-20 hours/week"
      },
      {
        id: 3,
        title: "IoT Specialist",
        description: "Integrate smart farming devices with our platform for automated monitoring.",
        skills: ["IoT", "Embedded Systems", "API Development"],
        commitment: "Project-based, approx. 30 hours total"
      }
    ],
    location: "Hybrid (Portland, OR and Remote)",
    startDate: "January 10, 2025",
    timeline: "12 months for initial launch, ongoing development",
    updates: [
      {
        id: 1,
        author: "marcus_green",
        date: "April 16, 2025",
        content: "Wireframes approved! Looking for developers to start building the platform. We're also in talks with three urban farming collectives in Portland to be our first users."
      }
    ]
  }
};

const ProjectPage = ({ currentUser }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProject = () => {
      setLoading(true);
      setTimeout(() => {
        const projectData = projectsData[id];
        if (projectData) {
          setProject(projectData);
        }
        setLoading(false);
      }, 500); // Simulating API delay
    };
    
    fetchProject();
  }, [id]);
  
  if (loading) {
    return <div className="loading-container">Loading project details...</div>;
  }
  
  if (!project) {
    return (
      <div className="not-found-container">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="back-link">Explore Projects</Link>
      </div>
    );
  }
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would be an API call to save/remove bookmark
  };
  
  const handleApply = (roleId) => {
    const role = project.openRoles.find(r => r.id === roleId);
    setSelectedRole(role);
    setShowApplicationModal(true);
  };
  
  const submitApplication = (formData) => {
    console.log("Application submitted:", formData);
    // In a real app, this would be an API call
    setShowApplicationModal(false);
    // Show success message or redirect
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <div className="breadcrumbs">
          <Link to="/explore">Projects</Link>
          <ChevronRight size={16} />
          <span>{project.category}</span>
          <ChevronRight size={16} />
          <span>{project.title}</span>
        </div>
        
        <div className="project-title-section">
          <h1>{project.title}</h1>
          <div className="project-actions">
            <button 
              className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark size={20} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button className="share-button">
              <Share2 size={20} />
              <span>Share</span>
            </button>
            <button className="report-button">
              <Flag size={20} />
              <span>Report</span>
            </button>
          </div>
        </div>
        
        <p className="project-description">{project.description}</p>
        
        <div className="project-metadata">
          <div className="metadata-item">
            <Calendar size={18} />
            <span>Started {project.startDate}</span>
          </div>
          <div className="metadata-item">
            <MapPin size={18} />
            <span>{project.location}</span>
          </div>
          <div className="metadata-item">
            <Users size={18} />
            <span>{project.collaborators.length} Collaborators, {project.openRoles.length} Open Roles</span>
          </div>
        </div>
        
        <div className="project-owner">
          <img src={project.owner.avatar} alt={project.owner.name} className="owner-avatar" />
          <div className="owner-info">
            <div className="owner-name">{project.owner.name}</div>
            <div className="owner-title">{project.owner.title}</div>
          </div>
          <Link to={`/profile/${project.owner.id}`} className="view-profile">View Profile</Link>
        </div>
      </div>
      
      <div className="project-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
        <button 
          className={`tab ${activeTab === 'openings' ? 'active' : ''}`}
          onClick={() => setActiveTab('openings')}
        >
          Open Roles ({project.openRoles.length})
        </button>
        <button 
          className={`tab ${activeTab === 'updates' ? 'active' : ''}`}
          onClick={() => setActiveTab('updates')}
        >
          Updates
        </button>
      </div>
      
      <div className="project-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="project-long-description" 
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
            
            <div className="project-details">
              <div className="detail-section">
                <h3>Required Skills</h3>
                <div className="skills-container">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Timeline</h3>
                <p>{project.timeline}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'team' && (
          <div className="team-tab">
            <h3>Team Members</h3>
            <div className="team-list">
              <div className="team-member owner">
                <img src={project.owner.avatar} alt={project.owner.name} className="member-avatar" />
                <div className="member-info">
                  <div className="member-name">{project.owner.name}</div>
                  <div className="member-title">{project.owner.title}</div>
                  <div className="member-role">Project Owner</div>
                </div>
                <div className="member-location">
                  <MapPin size={16} />
                  <span>{project.owner.location}</span>
                </div>
                <Link to={`/profile/${project.owner.id}`} className="view-profile-button">View Profile</Link>
              </div>
              
              {project.collaborators.map(member => (
                <div key={member.id} className="team-member">
                  <img src={member.avatar} alt={member.name} className="member-avatar" />
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                    <div className="member-title">{member.title}</div>
                    <div className="member-role">{member.role}</div>
                  </div>
                  <Link to={`/profile/${member.id}`} className="view-profile-button">View Profile</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'openings' && (
          <div className="openings-tab">
            <h3>Open Roles</h3>
            {project.openRoles.length > 0 ? (
              <div className="open-roles-list">
                {project.openRoles.map(role => (
                  <div key={role.id} className="role-card">
                    <div className="role-header">
                      <h4>{role.title}</h4>
                      <span className="role-commitment">{role.commitment}</span>
                    </div>
                    <p className="role-description">{role.description}</p>
                    <div className="role-skills">
                      <h5>Required Skills:</h5>
                      <div className="skills-container">
                        {role.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <button 
                      className="apply-button"
                      onClick={() => handleApply(role.id)}
                    >
                      Apply for Role
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-openings">There are currently no open roles for this project.</p>
            )}
          </div>
        )}
        
        {activeTab === 'updates' && (
          <div className="updates-tab">
            <h3>Project Updates</h3>
            {project.updates.length > 0 ? (
              <div className="updates-list">
                {project.updates.map(update => {
                  const author = update.author === project.owner.id 
                    ? project.owner 
                    : project.collaborators.find(c => c.id === update.author);
                  
                  return (
                    <div key={update.id} className="update-card">
                      <div className="update-header">
                        <img 
                          src={author?.avatar || "/api/placeholder/40/40"} 
                          alt={author?.name || "Team Member"} 
                          className="update-author-avatar" 
                        />
                        <div className="update-meta">
                          <div className="update-author-name">{author?.name || "Team Member"}</div>
                          <div className="update-date">{update.date}</div>
                        </div>
                      </div>
                      <div className="update-content">
                        {update.content}
                      </div>
                      <div className="update-actions">
                        <button className="comment-button">
                          <MessageSquare size={16} />
                          <span>Comment</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-updates">No updates have been posted yet.</p>
            )}
          </div>
        )}
      </div>
      
      {showApplicationModal && selectedRole && (
        <div className="modal-overlay">
          <div className="application-modal">
            <div className="modal-header">
              <h3>Apply for: {selectedRole.title}</h3>
              <button className="close-button" onClick={() => setShowApplicationModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-content">
              <form className="application-form" onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  message: e.target.message.value,
                  role: selectedRole.id
                };
                submitApplication(formData);
              }}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    defaultValue={currentUser?.name || ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    defaultValue={currentUser?.email || ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Why are you interested in this role?</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required 
                    placeholder="Tell the project owner about your relevant skills and why you're interested in this project..."
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowApplicationModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;