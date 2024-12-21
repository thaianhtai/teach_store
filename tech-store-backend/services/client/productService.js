const Product = require('../../models/product.model');

// Lấy tất cả sản phẩm từ MongoDB
const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error('Lỗi khi truy vấn sản phẩm: ' + error.message);
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id); // Truy vấn sản phẩm theo ID
    return product;
  } catch (error) {
    throw new Error('Lỗi khi truy vấn sản phẩm theo ID: ' + error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};