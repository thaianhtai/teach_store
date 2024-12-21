const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discount_percentage: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

module.exports = mongoose.model('Discount', discountSchema);
