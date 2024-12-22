  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import './Auth.css';

  const VerifyAccount = () => {
    const [formData, setFormData] = useState({ email: '', verificationCode: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleVerify = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/customer/auth/verify-account', formData);
        
        // Lưu token và thông tin người dùng vào localStorage
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setMessage('Tài khoản đã được xác thực thành công!');
        setError('');

        // Chuyển đến trang chủ
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || 'Đã xảy ra lỗi');
        setMessage('');
      }
    };

    return (
      <div className="auth-form">
        <h1>Xác nhận tài khoản</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleVerify}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Mã xác nhận</label>
          <input
            type="text"
            name="verificationCode"
            placeholder="Nhập mã xác nhận"
            value={formData.verificationCode}
            onChange={handleChange}
            required
          />
          <button type="submit">Xác nhận</button>
        </form>
      </div>
    );
  };

  export default VerifyAccount;
