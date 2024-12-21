import React from 'react';
import Header from './ClientHeader'; // Đường dẫn đúng đến Header component
import Footer from './ClientFooter'; // Đường dẫn đúng đến Footer component
import './partials.css'; // CSS chung cho bố cục

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main-content">{children}</main> {/* Nội dung chính */}
      <Footer />
    </div>
  );
};

export default Layout;
