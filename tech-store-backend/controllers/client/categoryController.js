const Category = require('../../models/category.model');

// Lấy danh sách danh mục
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục: ' + error.message });
  }
};

// Thêm danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo danh mục: ' + error.message });
  }
};

module.exports = { getCategories, createCategory };
