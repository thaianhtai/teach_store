const User = require('../../models/user.model'); // Giả sử bạn có model User

// Lấy tất cả người dùng
const getAllUsers = async () => {
  return await User.find(); // Trả về tất cả người dùng từ cơ sở dữ liệu
};

// Lấy người dùng theo ID
const getUserById = async (id) => {
  return await User.findById(id); // Trả về người dùng theo ID
};

module.exports = {
  getAllUsers,
  getUserById,
};
