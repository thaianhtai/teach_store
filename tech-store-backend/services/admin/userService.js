const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

// Lấy danh sách tất cả người dùng
const getAllUsers = async () => {
  return await User.find();
};

// Lấy người dùng theo ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Thêm tài khoản mới
const addUser = async ({ username, email, password, role }) => {
  if (!username || !email || !password) {
    throw new Error('Vui lòng nhập đầy đủ thông tin (username, email, password)!');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã được sử dụng!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return await newUser.save();
};


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
