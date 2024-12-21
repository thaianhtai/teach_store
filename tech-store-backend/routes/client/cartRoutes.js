const express = require('express');
const authMiddleware = require('../../middleware/client/authMiddleware');
const cartController = require('../../controllers/client/cartController');

const router = express.Router();

router.post('/add', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);

module.exports = router;
