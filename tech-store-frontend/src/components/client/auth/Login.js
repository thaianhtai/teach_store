import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext
import { useAlert } from '../../../components/client/partials/Alert'; // Import Alert
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ AuthContext
  const addAlert = useAlert(); // Lấy hàm addAlert từ Alert Context

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/customer/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error('Dữ liệu trả về không hợp lệ!');
      }

      // Gọi hàm login từ AuthContext
      login(user, token);

      // Hiển thị thông báo thành công
      addAlert('Đăng nhập thành công!', 'success');

      // Điều hướng dựa trên vai trò
      if (user.role === 'admin') {
        navigate('/auth/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại! Vui lòng thử lại.';
      addAlert(errorMessage, 'error'); // Hiển thị thông báo lỗi
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default Login;
