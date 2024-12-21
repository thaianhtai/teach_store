const Product = require('../../models/product.model');

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm: ' + error.message });
  }
};

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, description, price, rental_price, stock_quantity, categoryId, image_url } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      rental_price,
      stock_quantity,
      category: categoryId,
      image_url,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm: ' + error.message });
  }
};

module.exports = { getProducts, createProduct };
