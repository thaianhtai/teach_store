const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

// Route lấy danh sách tất cả người dùng
router.get('/', userController.getUsers);

// Route lấy người dùng theo ID
router.get('/:id', userController.getUser);

module.exports = router;
