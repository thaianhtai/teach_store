const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  payment_method: { type: String, enum: ['COD', 'VNPAY'], required: true },
  payment_status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
