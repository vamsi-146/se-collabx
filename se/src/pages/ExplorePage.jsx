import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Filter, Search, X, ChevronDown, ArrowUpDown } from 'lucide-react';
import '../styles/ExplorePage.css';

// Demo data - would come from API in real app
const demoProjects = [
  {
    id: 1,
    title: "AI-Powered Healthcare Assistant",
    description: "Looking for ML engineers and healthcare professionals to build an AI tool for medical diagnostics.",
    owner: {
      name: "Dr. Sarah Chen",
      id: "sarah_chen",
      avatar: "/api/placeholder/60/60"
    },
    category: "Healthcare",
    skills: ["Machine Learning", "Python", "Healthcare", "Data Science"],
    collaborators: 3,
    openRoles: 2,
    createdAt: "2025-03-15T10:30:00Z",
    lastActivity: "2025-04-10T14:22:00Z"
  },
  {
    id: 2,
    title: "Sustainable Urban Farming Platform",
    description: "Creating a digital platform to connect urban farmers with resources and local markets.",
    owner: {
      name: "Marcus Green",
      id: "marcus_green",
      avatar: "/api/placeholder/60/60"
    },
    category: "Sustainability",
    skills: ["UX/UI Design", "React", "Node.js", "Agriculture", "Mobile Development"],
    collaborators: 2,
    openRoles: 3,
    createdAt: "2025-03-20T08:15:00Z",
    lastActivity: "2025-04-16T09:45:00Z"
  },
  {
    id: 3,
    title: "AR Educational App for Children",
    description: "Developing an augmented reality app that makes learning fun and interactive for kids.",
    owner: {
      name: "Priya Patel",
      id: "priya_patel",
      avatar: "/api/placeholder/60/60"
    },
    category: "Education",
    skills: ["Unity", "AR Development", "3D Modeling", "Educational Content"],
    collaborators: 4,
    openRoles: 2,
    createdAt: "2025-02-18T15:40:00Z",
    lastActivity: "2025-04-15T11:30:00Z"
  },
  {
    id: 4,
    title: "Blockchain Supply Chain Tracker",
    description: "Building a transparent supply chain solution using blockchain technology for ethical sourcing.",
    owner: {
      name: "James Wilson",
      id: "james_wilson",
      avatar: "/api/placeholder/60/60"
    },
    category: "Blockchain",
    skills: ["Solidity", "Smart Contracts", "React", "Supply Chain"],
    collaborators: 2,
    openRoles: 4,
    createdAt: "2025-03-28T12:20:00Z",
    lastActivity: "2025-04-17T16:10:00Z"
  },
  {
    id: 5,
    title: "Mental Health Support Mobile App",
    description: "Creating an app that provides resources and community support for mental wellness.",
    owner: {
      name: "Elena Rodriguez",
      id: "elena_rodriguez",
      avatar: "/api/placeholder/60/60"
    },
    category: "Health & Wellness",
    skills: ["React Native", "UI Design", "Psychology", "Backend Development"],
    collaborators: 3,
    openRoles: 2,
    createdAt: "2025-04-01T09:50:00Z",
    lastActivity: "2025-04-16T13:25:00Z"
  },
  {
    id: 6,
    title: "Renewable Energy Monitoring System",
    description: "Developing IoT sensors and dashboard for tracking solar and wind energy production.",
    owner: {
      name: "Ahmed Hassan",
      id: "ahmed_hassan",
      avatar: "/api/placeholder/60/60"
    },
    category: "Clean Energy",
    skills: ["IoT", "Data Visualization", "Electronics", "Cloud Computing"],
    collaborators: 5,
    openRoles: 1,
    createdAt: "2025-03-05T11:15:00Z",
    lastActivity: "2025-04-14T10:20:00Z"
  }
];

// Categories for filter
const categories = [
  "All Categories", "Technology", "Healthcare", "Education", "Sustainability", 
  "Blockchain", "Health & Wellness", "Clean Energy", "Arts & Culture", 
  "Finance", "Social Impact", "Gaming"
];

// Skills for filter
const popularSkills = [
  "JavaScript", "React", "Python", "Data Science", "Machine Learning", "UI/UX Design", 
  "Mobile Development", "Blockchain", "Content Creation", "Marketing", "Business Strategy", 
  "Product Management", "IoT", "AI", "Cloud Computing"
];

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [roleFilter, setRoleFilter] = useState("any");
  const [sortBy, setSortBy] = useState("relevance");
  
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Filter and sort projects based on search and filters
  useEffect(() => {
    let results = [...demoProjects];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All Categories") {
      results = results.filter(project => project.category === selectedCategory);
    }
    
    // Filter by skills
    if (selectedSkills.length > 0) {
      results = results.filter(project => 
        selectedSkills.some(skill => project.skills.includes(skill))
      );
    }
    
    // Filter by open roles
    if (roleFilter === "hasOpenings") {
      results = results.filter(project => project.openRoles > 0);
    }
    
    // Sort results
    switch (sortBy) {
      case "newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "activity":
        results.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
        break;
      case "openings":
        results.sort((a, b) => b.openRoles - a.openRoles);
        break;
      // "relevance" is default and uses the current order
      default:
        break;
    }
    
    setFilteredProjects(results);
  }, [searchQuery, selectedCategory, selectedSkills, roleFilter, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedSkills([]);
    setRoleFilter("any");
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explore Projects</h1>
        <p>Discover opportunities to collaborate or find the perfect talent for your vision</p>
        
        <form className="explore-search" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, or keywords..."
            />
          </div>
          <button type="submit" className="search-button">Search</button>
          <button 
            type="button" 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </form>
      </div>
      
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          </div>
          
          <div className="filter-sections">
            <div className="filter-section">
              <h4>Category</h4>
              <div className="category-dropdown">
                <div className="dropdown-header">
                  <span>{selectedCategory}</span>
                  <ChevronDown size={16} />
                </div>
                <div className="dropdown-options">
                  {categories.map(category => (
                    <div 
                      key={category} 
                      className={`dropdown-option ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Skills Needed</h4>
              <div className="skills-grid">
                {popularSkills.map(skill => (
                  <div 
                    key={skill}
                    className={`skill-checkbox ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && <X size={12} />}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Open Roles</h4>
              <div className="radio-options">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="role-filter" 
                    checked={roleFilter === "any"} 
                    onChange={() => setRoleFilter("any")}
                  />
                  <span>Any</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="role-filter" 
                    checked={roleFilter === "hasOpenings"} 
                    onChange={() => setRoleFilter("hasOpenings")}
                  />
                  <span>Has Open Roles</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="results-header">
        <div className="results-count">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
        </div>
        <div className="sort-options">
          <span>Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="activity">Recent Activity</option>
            <option value="openings">Most Openings</option>
          </select>
          <ArrowUpDown size={16} />
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <span className="project-category">{project.category}</span>
                <Link to={`/project/${project.id}`} className="project-title">{project.title}</Link>
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
                  <img src={project.owner.avatar} alt={project.owner.name} className="owner-avatar" />
                  <span className="owner-name">{project.owner.name}</span>
                </div>
                <div className="project-stats">
                  <span className="collaborators">{project.collaborators} collaborators</span>
                  <span className="open-roles">{project.openRoles} open roles</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No projects found</h3>
            <p>Try adjusting your search terms or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;