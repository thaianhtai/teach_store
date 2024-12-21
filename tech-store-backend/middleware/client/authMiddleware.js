const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });
    }

    // Tách token từ header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token không hợp lệ.' });
    }

    // Xác minh token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    // Tìm người dùng dựa trên id từ token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại.' });
    }

    // Gắn thông tin người dùng vào request để sử dụng trong các middleware/route tiếp theo
    req.user = user;

    // Tiếp tục
    next();
  } catch (err) {
    console.error('Lỗi xác thực:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
  }
};

module.exports = authMiddleware;
