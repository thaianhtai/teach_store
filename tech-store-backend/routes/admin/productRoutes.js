const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');

// Route: GET /api/admin/products
router.get('/', productController.getAllProducts);

module.exports = router;
