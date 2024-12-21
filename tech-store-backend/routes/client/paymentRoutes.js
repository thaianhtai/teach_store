const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/client/paymentController');

// Route tạo thanh toán MoMo
router.post('/momo', paymentController.createMoMoPayment);

router.post('/momo/ipn', paymentController.handleMoMoIPN);

module.exports = router;
