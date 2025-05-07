import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage';
import CreateProjectPage from './pages/CreateProjectPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import Users from './components/Users'; // Corrected import
import TestBackendConnection from './components/TestBackendConnection';

import './styles/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Simulate user auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('collabx_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('collabx_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('collabx_user');
  };

  return (
    <Router>
      <div className="app">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<><HomePage /><TestBackendConnection /></>} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile/:id" element={<ProfilePage currentUser={currentUser} />} />
            <Route path="/project/:id" element={<ProjectPage currentUser={currentUser} />} />
            <Route 
              path="/create-project" 
              element={
                currentUser ? 
                <CreateProjectPage currentUser={currentUser} /> : 
                <LoginPage onLogin={handleLogin} message="Please login to create a project" />
              } 
            />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
            <Route path="/test-connection" element={<TestBackendConnection />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
