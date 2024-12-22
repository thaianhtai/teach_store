import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm kiểm tra token hết hạn
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã JWT payload
      return payload.exp * 1000 < Date.now(); // Kiểm tra thời gian hết hạn
    } catch (err) {
      return true; // Nếu token không hợp lệ
    }
  };

  // Khôi phục trạng thái từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('customer'));
    if (token && storedUser) {
      if (isTokenExpired(token)) {
        // Token hết hạn, xóa thông tin
        logout();
      } else {
        // Token hợp lệ, thiết lập trạng thái
        setIsAuthenticated(true);
        setUser(storedUser);
      }
    }
    setLoading(false); // Dừng loading sau khi kiểm tra
  }, []);

  const login = (userData, token) => {
    // Lưu thông tin xác thực
    localStorage.setItem('token', token);
    localStorage.setItem('customer', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // Xóa thông tin xác thực
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {loading ? <div className="loading-screen">Đang kiểm tra đăng nhập...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
