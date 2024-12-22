const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập!' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ!' });
  }
};

module.exports = adminAuth;
