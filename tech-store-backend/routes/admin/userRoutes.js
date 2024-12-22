const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');
const adminAuth = require('../../middleware/admin/authMiddleware');

// Lấy tất cả người dùng
router.get('/', adminAuth, userController.getUsers);

// Lấy người dùng theo ID
router.get('/:id', adminAuth, userController.getUser);

// Thêm tài khoản mới
router.post('/', adminAuth, userController.addUser);

module.exports = router;
