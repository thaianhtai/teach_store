const express = require('express');
const productController = require('../../controllers/admin/productController');
const productMiddleware = require('../../middleware/admin/productMiddleware'); // Import middleware mới

const router = express.Router();

// Định tuyến API sản phẩm
router.get('/', productController.getProducts);
router.post('/', productMiddleware.verifyAdmin, productController.addProduct);  // Cần bảo mật
router.put('/:id', productMiddleware.verifyAdmin, productController.updateProduct);  // Cần bảo mật
router.delete('/:id', productMiddleware.verifyAdmin, productController.deleteProduct);  // Cần bảo mật

module.exports = router;
