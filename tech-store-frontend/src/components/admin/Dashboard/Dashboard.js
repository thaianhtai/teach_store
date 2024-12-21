import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../client/auth/AuthContext'; // Import AuthContext
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useAuth(); // Lấy trạng thái xác thực từ AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) { // Chỉ kiểm tra khi loading hoàn tất
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/login'); // Chuyển hướng về trang đăng nhập nếu không hợp lệ
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading) {
    return <p>Đang tải...</p>; // Hiển thị khi dữ liệu đang khôi phục
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h1>Chào mừng đến với Trang quản lý</h1>
        <p>Quản lý sản phẩm, người dùng, và cài đặt tại đây.</p>
      </div>
    </div>
  );
};

export default Dashboard;
