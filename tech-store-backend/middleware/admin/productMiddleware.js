// productMiddleware.js

// Middleware kiểm tra quyền admin
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
};

// Các middleware khác có thể thêm vào ở đây nếu cần
module.exports = {
    verifyAdmin
};
