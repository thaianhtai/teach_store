import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Khôi phục trạng thái từ localStorage
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('customer'));
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
    setLoading(false); // Dừng loading sau khi kiểm tra
  }, []);

  const login = (userData, token) => {
    // Nhận token và userData từ phản hồi API khi đăng nhập
    localStorage.setItem('token', token);
    localStorage.setItem('customer', JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // Xóa token và thông tin người dùng khi đăng xuất
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {loading ? <p>Đang tải...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
