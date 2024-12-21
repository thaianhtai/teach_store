const express = require('express');
const router = express.Router();
const {loginUser, registerUser, verifyAccount } = require('../../controllers/client/authController');

// Route đăng nhập
router.post('/login', loginUser);

// Route: Đăng ký tài khoản
router.post('/register', registerUser);

// Route: Xác nhận tài khoản
router.post('/verify-account', verifyAccount);

module.exports = router;
