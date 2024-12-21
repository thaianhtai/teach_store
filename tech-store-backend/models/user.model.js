const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  isVerified: { type: Boolean, default: false }, // Trạng thái xác thực email
  verificationCode: { type: String, default: null }, // Mã xác thực
  verificationExpiry: { type: Date, default: null }, // Thời gian hết hạn mã
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Hàm static để seed tài khoản admin
userSchema.statics.seedAdmin = async function () {
  try {
    const User = this; // Model User hiện tại

    // Kiểm tra nếu tài khoản admin đã tồn tại
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin account already exists.');
      return;
    }

    // Tạo mật khẩu hash
    const hashedPassword = await bcrypt.hash('admin123', 10); // Mật khẩu mặc định là "admin123"

    // Thêm tài khoản admin
    const admin = new User({
      username: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true, // Admin mặc định đã xác thực
    });

    await admin.save();
    console.log('Admin account created successfully.');
  } catch (err) {
    console.error('Error creating admin account:', err.message);
  }
};

// Export model
const User = mongoose.model('User', userSchema);

// Gọi seedAdmin ngay khi model được sử dụng
(async () => {
  await User.seedAdmin();
})();

module.exports = User;
