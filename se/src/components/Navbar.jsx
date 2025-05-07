import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bell, User } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?q=${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">Collab<span className="logo-highlight">X</span></span>
          </Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search projects, skills, or people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <Search size={20} />
          </button>
        </form>

        <div className="desktop-nav">
          <Link to="/explore" className="nav-link">Explore</Link>
          {currentUser ? (
            <>
              <Link to="/create-project" className="nav-link">Create Project</Link>
              <div className="nav-link notification-icon">
                <Bell size={20} />
              </div>
              <div className="user-menu">
                <Link to={`/profile/${currentUser.id}`} className="profile-link">
                  {currentUser.profileImage ? (
                    <img src={currentUser.profileImage} alt="Profile" className="profile-image" />
                  ) : (
                    <div className="profile-icon">
                      <User size={20} />
                    </div>
                  )}
                </Link>
                <div className="dropdown-menu">
                  <Link to={`/profile/${currentUser.id}`}>My Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={onLogout} className="logout-button">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="register-button">Sign Up</Link>
            </div>
          )}
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/explore" className="mobile-nav-link" onClick={toggleMenu}>Explore</Link>
          {currentUser ? (
            <>
              <Link to="/create-project" className="mobile-nav-link" onClick={toggleMenu}>Create Project</Link>
              <Link to={`/profile/${currentUser.id}`} className="mobile-nav-link" onClick={toggleMenu}>My Profile</Link>
              <Link to="/settings" className="mobile-nav-link" onClick={toggleMenu}>Settings</Link>
              <button onClick={() => {onLogout(); toggleMenu();}} className="mobile-logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;