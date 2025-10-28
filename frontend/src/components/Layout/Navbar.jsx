import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/game" onClick={closeMenu}>
          <i className="bi bi-cursor-fill me-2"></i>
          UnClickMas
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/game')}`}
                to="/game"
                onClick={closeMenu}
              >
                <i className="bi bi-joystick me-1"></i>
                Jugar
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/leaderboard')}`}
                to="/leaderboard"
                onClick={closeMenu}
              >
                <i className="bi bi-trophy me-1"></i>
                Ranking
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/profile')}`}
                to="/profile"
                onClick={closeMenu}
              >
                <i className="bi bi-person-circle me-1"></i>
                Perfil
              </Link>
            </li>
            
            <li className="nav-item ms-lg-3">
              <div className="d-flex align-items-center text-white px-3 py-2 bg-primary bg-opacity-50 rounded my-2 my-lg-0">
                <i className="bi bi-star-fill text-warning me-2"></i>
                <span className="fw-bold">{user?.TotalPoints?.toLocaleString() || 0}</span>
              </div>
            </li>
            
            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-outline-light btn-sm mt-2 mt-lg-0 w-100"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;