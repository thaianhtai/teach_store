const Product = require('../../models/product.model');

// Lấy tất cả sản phẩm (Admin)
const getAllProducts = async () => {
  const products = await Product.find(); // Admin xem được tất cả sản phẩm
  return products;
};

module.exports = { getAllProducts };
