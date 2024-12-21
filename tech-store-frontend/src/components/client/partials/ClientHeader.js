import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './partials.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(''); // Thêm trạng thái để kiểm tra role
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token và thông tin người dùng trong localStorage
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('customer')); // Lấy thông tin người dùng từ localStorage
    if (token && user) {
      setIsAuthenticated(true);
      setUsername(user.username); // Cập nhật username từ localStorage
      setRole(user.role); // Cập nhật role từ localStorage
    }
  }, []);

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    setIsAuthenticated(false);
    setUsername('');
    setRole('');
    navigate('/'); // Chuyển hướng về trang chủ
  };

  return (
    <header className="header">
      <div className="logo"><Link to="/">Tech Store</Link></div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/products">Sản phẩm</Link></li>
          <li><Link to="/contact">Liên hệ</Link></li>
          <li><Link to="/cart">Giỏ hàng</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Đăng nhập</Link></li>
              <li><Link to="/register">Đăng ký</Link></li>
            </>
          ) : (
            <li className="dropdown">
              <span className="dropdown-username">{username}</span>
              <ul className="dropdown-menu">
                {role === 'admin' && <li><Link to="/auth/dashboard">Quản lý</Link></li>} {/* Link cho Admin */}
                <li><Link to="/information">Thông tin cá nhân</Link></li>
                <li onClick={handleLogout} className="logout-button">Đăng xuất</li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
