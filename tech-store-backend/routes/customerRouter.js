const express = require('express');
const router = express.Router();

// Import các router liên quan đến admin
const authRouter = require('./client/authRoutes');
const categoryRouter = require('./client/categoryRoutes');
const paymentRouter = require('./client/paymentRoutes');
const productRouter = require('./client/productRoutes');
const cartRouter = require('./client/cartRoutes');

// Sử dụng các router vào adminRouter
router.use('/auth', authRouter);            // Đăng nhập, đăng ký, xác nhận
router.use('/categories', categoryRouter);  // Quản lý danh mục
router.use('/payment', paymentRouter);      // Thanh toán
router.use('/products', productRouter);    // Quản lý sản phẩm
router.use('/cart', cartRouter);            // Quản lý giỏ hàng

module.exports = router;
