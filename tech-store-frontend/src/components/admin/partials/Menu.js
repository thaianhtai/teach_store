import React from 'react';
import { NavLink } from 'react-router-dom';
import './admin.css';

const Menu = () => {
  return (
    <aside className="menu-container">
      <div className="menu-header">Admin Panel</div>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink
            to="/auth/dashboard"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <span className="icon">🏠</span> Dashboard
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/auth/account-management"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <span className="icon">🙍‍♂️</span> Account Management
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/auth/product-management"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <span className="icon">📦</span> Product Management
          </NavLink>
        </li>
      </ul>
      <div className="menu-footer">© 2024 Your Company</div>
    </aside>
  );
};

export default Menu;
