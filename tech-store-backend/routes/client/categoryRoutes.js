const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/client/categoryController');

// API GET: Lấy danh sách danh mục
router.get('/categories', categoryController.getCategories);

// API POST: Thêm danh mục mới
router.post('/categories', categoryController.createCategory);

module.exports = router;
