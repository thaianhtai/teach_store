import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './accountManagement.css';
import { useAlert } from '../../../components/client/partials/Alert'; // Import Alert hook

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    username: '',
    email: '',
    password: '', // Thêm trường password
    role: 'customer',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const showAlert = useAlert(); // Sử dụng Alert hook
  const token = localStorage.getItem('token'); // Lấy token từ localStorage

  // Lấy danh sách tài khoản từ API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tài khoản:', error);
        const errorMessage =
          error.response?.data?.message || 'Không thể tải danh sách tài khoản!';
        showAlert(errorMessage, 'error');
      }
    };

    fetchAccounts();
  }, [token]);

  // Thêm tài khoản mới
  const handleAddAccount = async () => {
    if (!newAccount.username || !newAccount.email || !newAccount.password) {
      showAlert('Vui lòng điền đầy đủ thông tin!', 'error');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/users',
        newAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setAccounts([...accounts, response.data.user]);
      setNewAccount({ username: '', email: '', password: '', role: 'customer' }); // Reset form
      setShowAddForm(false);
      showAlert('Thêm tài khoản thành công!', 'success'); // Thông báo thành công
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error);
      const errorMessage =
        error.response?.data?.message || 'Không thể thêm tài khoản!';
      showAlert(errorMessage, 'error');
    }
  };

  // Xóa tài khoản
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setAccounts(accounts.filter((account) => account._id !== id));
      showAlert('Xóa tài khoản thành công!', 'success'); // Thông báo thành công
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error);
      const errorMessage =
        error.response?.data?.message || 'Không thể xóa tài khoản!';
      showAlert(errorMessage, 'error');
    }
  };

  return (
    <div className="account-management">
      <h1>Quản Lý Tài Khoản</h1>

      {!showAddForm && (
        <button className="add-account-button" onClick={() => setShowAddForm(true)}>
          Thêm Tài Khoản
        </button>
      )}

      {showAddForm && (
        <div className="edit-form">
          <h2>Thêm Tài Khoản</h2>
          <div className="form-group">
            <label>Tên Tài Khoản:</label>
            <input
              type="text"
              value={newAccount.username}
              onChange={(e) =>
                setNewAccount({ ...newAccount, username: e.target.value })
              }
              name="username"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={newAccount.email}
              onChange={(e) =>
                setNewAccount({ ...newAccount, email: e.target.value })
              }
              name="email"
            />
          </div>
          <div className="form-group">
            <label>Mật Khẩu:</label>
            <input
              type="password"
              value={newAccount.password}
              onChange={(e) =>
                setNewAccount({ ...newAccount, password: e.target.value })
              }
              name="password"
            />
          </div>
          <div className="form-group">
            <label>Vai Trò:</label>
            <select
              name="role"
              value={newAccount.role}
              onChange={(e) =>
                setNewAccount({ ...newAccount, role: e.target.value })
              }
            >
              <option value="customer">Khách Hàng</option>
              <option value="admin">Quản Trị</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="save-button" onClick={handleAddAccount}>
              Lưu
            </button>
            <button className="cancel-button" onClick={() => setShowAddForm(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="account-table">
        <thead>
          <tr>
            <th>Tên Tài Khoản</th>
            <th>Email</th>
            <th>Vai Trò</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account._id}>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{account.role}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => setEditingAccount(account)}
                >
                  Sửa
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(account._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountManagement;
