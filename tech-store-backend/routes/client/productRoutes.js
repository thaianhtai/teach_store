const express = require('express');
const { getProducts } = require('../../controllers/client/productController');

const router = express.Router();

router.get('/', getProducts);

module.exports = router;
