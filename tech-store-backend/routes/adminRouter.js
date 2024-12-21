const express = require('express');
const router = express.Router();

// Import các router liên quan đến admin
const userRoutes = require('./admin/userRoutes');

const productRouter = require('./admin/productRoutes');


// Sử dụng các router vào adminRouter
router.use('/users', userRoutes);
router.use('/products', productRouter);    // Quản lý sản phẩm

module.exports = router;
