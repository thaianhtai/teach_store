import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import Menu from './Menu';
import './admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-main">
        <Menu />
        <main className="admin-content">
          <Outlet /> {/* Render các trang con */}
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
