const userService = require('../../services/admin/userService');

// Lấy danh sách tất cả người dùng
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Lấy người dùng theo ID
const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Thêm tài khoản mới
const addUser = async (req, res) => {
  console.log('Dữ liệu yêu cầu:', req.body); // Log dữ liệu nhận được
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json({ message: 'Tài khoản được tạo thành công!', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
};
