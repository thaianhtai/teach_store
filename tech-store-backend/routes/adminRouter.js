const express = require('express');
const router = express.Router();

// Import các route của người dùng và sản phẩm
const userRoutes = require('./admin/userRoutes');
const productRoutes = require('./admin/productRoutes');

// Gắn route cho người dùng
router.use('/users', userRoutes);

// Gắn route cho sản phẩm
router.use('/products', productRoutes);

module.exports = router;
