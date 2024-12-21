const productService = require('../../services/admin/productService');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: err.message });
  }
};

module.exports = { getAllProducts };
