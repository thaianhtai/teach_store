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

// Lấy một người dùng theo ID
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

module.exports = {
  getUsers,
  getUser,
};
