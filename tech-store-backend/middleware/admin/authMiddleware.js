const jwt = require('jsonwebtoken');

// Middleware xác thực và kiểm tra quyền admin
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra xem có token không
  if (!authHeader) {
    return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập!' });
  }

  const token = authHeader.split(' ')[1]; // Tách token từ chuỗi "Bearer <token>"

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra quyền
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập!' });
    }

    req.user = decoded; // Lưu thông tin user vào request
    next(); // Chuyển tiếp đến middleware/route tiếp theo
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ!' });
  }
};

module.exports = adminAuth;
