const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');
const sendEmail = require('../../services/client/emailService'); // Hàm gửi email

// Đăng nhập
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra tài khoản tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu!' });
    }

    // Kiểm tra xác thực tài khoản
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Tài khoản chưa được xác thực!' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Trả về phản hồi
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Lỗi khi đăng nhập:', err.message);
    res.status(500).json({ message: 'Lỗi server!', error: err.message });
  }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
  }

  try {
    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng!' });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mã xác nhận
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Tạo tài khoản mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'customer',
      verificationCode,
      verificationExpiry,
    });

    await newUser.save();

    // Gửi email xác nhận
    const subject = 'Mã xác nhận tài khoản';
    const text = `Xin chào ${username},\n\nMã xác nhận tài khoản của bạn là: ${verificationCode}\n\nMã này sẽ hết hạn sau 15 phút.\n\nCảm ơn!`;
    await sendEmail(email, subject, text);

    res.status(201).json({
      message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.',
    });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err.message);
    res.status(500).json({ message: 'Lỗi server!', error: err.message });
  }
};

// Xác nhận tài khoản
const verifyAccount = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mã xác nhận!' });
  }

  try {
    // Tìm tài khoản
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    // Kiểm tra xác thực
    if (user.isVerified) {
      return res.status(400).json({ message: 'Tài khoản đã được xác thực!' });
    }

    // Kiểm tra mã xác nhận
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Mã xác nhận không chính xác!' });
    }

    // Kiểm tra thời gian hết hạn
    if (user.verificationExpiry < new Date()) {
      return res.status(400).json({ message: 'Mã xác nhận đã hết hạn!' });
    }

    // Xác thực tài khoản
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpiry = null;
    await user.save();

    // Tạo token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Phản hồi
    res.status(200).json({
      message: 'Tài khoản đã được xác thực thành công!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Lỗi khi xác thực tài khoản:', err.message);
    res.status(500).json({ message: 'Lỗi server!', error: err.message });
  }
};

module.exports = { loginUser, registerUser, verifyAccount };
