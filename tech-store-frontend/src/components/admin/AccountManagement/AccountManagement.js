import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './accountManagement.css';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    username: '',
    email: '',
    role: 'customer',
  });
  const [showAddForm, setShowAddForm] = useState(false); // state để điều khiển hiển thị form thêm tài khoản

  // Lấy danh sách tài khoản từ API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  // Lắng nghe thay đổi input khi chỉnh sửa tài khoản
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    
    if (type === 'edit') {
      setEditingAccount((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewAccount((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Bắt đầu chỉnh sửa tài khoản
  const handleEdit = (account) => {
    setEditingAccount(account);
  };

  // Lưu các thay đổi tài khoản
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${editingAccount._id}`,
        editingAccount
      );
      const updatedAccounts = accounts.map((account) =>
        account._id === editingAccount._id ? response.data.user : account
      );
      setAccounts(updatedAccounts);
      setEditingAccount(null);
      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  // Xóa tài khoản
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setAccounts(accounts.filter((account) => account._id !== id));
      alert('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Thêm tài khoản mới
  const handleAddAccount = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/users', newAccount);
      setAccounts([...accounts, response.data.user]);
      setNewAccount({ username: '', email: '', role: 'customer' });
      setShowAddForm(false); // Đóng form thêm sau khi thêm tài khoản
      alert('Account added successfully!');
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <div className="account-management">
      <h1>Account Management</h1>

      {/* Nút thêm tài khoản chỉ hiển thị khi không có form đang mở */}
      {!showAddForm && (
        <button className="add-account-button" onClick={() => setShowAddForm(true)}>
          Add New Account
        </button>
      )}

      {/* Form thêm tài khoản */}
      {showAddForm && (
        <div className="edit-form">
          <h2>Add New Account</h2>
          <div className="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              value={newAccount.username} 
              onChange={(e) => handleInputChange(e, 'add')} 
              name="username" 
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={newAccount.email} 
              onChange={(e) => handleInputChange(e, 'add')} 
              name="email" 
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select 
              name="role" 
              value={newAccount.role} 
              onChange={(e) => handleInputChange(e, 'add')}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="save-button" onClick={handleAddAccount}>Save</button>
            <button className="cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Danh sách tài khoản hiện tại */}
      {!showAddForm && (
        <table className="account-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id}>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(account)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(account._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Form chỉnh sửa tài khoản */}
      {editingAccount && !showAddForm && (
        <div className="edit-form">
          <h2>Edit Account</h2>
          <div className="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              value={editingAccount.username} 
              onChange={(e) => handleInputChange(e, 'edit')} 
              name="username" 
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={editingAccount.email} 
              onChange={(e) => handleInputChange(e, 'edit')} 
              name="email" 
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select 
              name="role" 
              value={editingAccount.role} 
              onChange={(e) => handleInputChange(e, 'edit')}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={() => setEditingAccount(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
