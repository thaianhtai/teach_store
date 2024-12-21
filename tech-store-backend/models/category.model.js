const mongoose = require('mongoose');

// Định nghĩa schema cho Danh mục
const categorySchema = new mongoose.Schema({
  category_id: { type: String, unique: true, required: true }, // ID duy nhất cho danh mục
  name: { type: String, required: true },
  description: { type: String },
});

// Hàm static để seed dữ liệu danh mục
categorySchema.statics.seedCategories = async function () {
  try {
    const Category = this; // Model Category hiện tại

    // Kiểm tra nếu danh mục đã tồn tại
    const count = await Category.countDocuments();
    if (count > 0) {
      console.log('Danh mục đã tồn tại.');
      return;
    }

    // Dữ liệu mẫu cho danh mục
    const categories = [
      { category_id: 'CAT001', name: 'Laptop', description: 'Danh mục các sản phẩm Laptop' },
      { category_id: 'CAT002', name: 'Smartphone', description: 'Danh mục các sản phẩm Điện thoại' },
      { category_id: 'CAT003', name: 'Tablet', description: 'Danh mục các sản phẩm Máy tính bảng' },
    ];

    // Lưu danh mục vào database
    await Category.insertMany(categories);
    console.log('Dữ liệu danh mục đã được tạo thành công.');
  } catch (err) {
    console.error('Lỗi khi tạo danh mục:', err.message);
  }
};

const Category = mongoose.model('Category', categorySchema);

// Gọi seedCategories ngay khi model được sử dụng
(async () => {
  await Category.seedCategories();
})();

module.exports = Category;
