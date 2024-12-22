const express = require('express');
const router = express.Router();

const userRoutes = require('./admin/userRoutes');

// Gắn route người dùng
router.use('/users', userRoutes);

module.exports = router;
