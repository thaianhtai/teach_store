import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../partials/Alert'; // Import Alert
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const addAlert = useAlert(); // Sử dụng Alert
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!formData.username || !formData.email || !formData.password) {
      addAlert('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/customer/auth/register', formData);

      // Hiển thị thông báo thành công
      addAlert('Đăng ký thành công! Vui lòng xác nhận tài khoản.', 'success');

      // Chuyển đến trang xác nhận tài khoản
      navigate('/verify-account', { state: { email: formData.email } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi trong quá trình đăng ký.';
      addAlert(errorMessage, 'error'); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="auth-form">
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleRegister}>
        <label>Tên đăng nhập</label>
        <input
          type="text"
          name="username"
          placeholder="Nhập tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
