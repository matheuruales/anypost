import React from 'react';
import { logout } from '../../services/firebase';
import './Navbar.css';

const Navbar = ({ user }) => {
  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>MultiPost</h2>
      </div>
      <div className="navbar-user">
        <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
        <span className="user-name">{user.displayName}</span>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;