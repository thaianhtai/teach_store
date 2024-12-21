const mongoose = require('mongoose');
const Category = require('./category.model'); // Import model Category

// Định nghĩa schema cho Sản phẩm
const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true, required: true }, // ID sản phẩm duy nhất
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Liên kết với Category
  image_url: { type: String },
  is_for_sale: { type: Boolean, default: true },
}, { timestamps: true });

// Hàm static để seed dữ liệu sản phẩm
productSchema.statics.seedProducts = async function (refresh = false) {
  try {
    const Product = this;

    if (refresh) {
      // Xóa dữ liệu cũ nếu refresh = true
      await Product.deleteMany();
      console.log('Đã xóa tất cả sản phẩm cũ.');
    }

    // Kiểm tra nếu sản phẩm đã tồn tại và không làm mới
    const count = await Product.countDocuments();
    if (count > 0 && !refresh) {
      console.log('Sản phẩm đã tồn tại.');
      return;
    }

    // Lấy danh mục từ database
    const categories = await Category.find();
    if (categories.length === 0) {
      console.log('Vui lòng thêm danh mục trước khi tạo sản phẩm.');
      return;
    }

    // Dữ liệu mẫu cho sản phẩm
    const products = [
      {
        product_id: 'PROD001',
        name: 'Laptop Dell XPS 15',
        description: 'Laptop hiệu năng cao cho dân văn phòng',
        price: 30000000,
        stock_quantity: 10,
        category: categories[0]._id, // Liên kết với danh mục đầu tiên
        image_url: 'https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg',
        is_for_sale: true,
      },
      {
        product_id: 'PROD002',
        name: 'iPhone 13 Pro Max',
        description: 'Điện thoại cao cấp với nhiều tính năng',
        price: 35000000,
        stock_quantity: 15,
        category: categories[1]._id, // Liên kết với danh mục thứ hai
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
        is_for_sale: true,
      },
    ];

    // Lưu sản phẩm vào database
    await Product.insertMany(products);
    console.log('Dữ liệu sản phẩm đã được tạo thành công.');
  } catch (err) {
    console.error('Lỗi khi tạo sản phẩm:', err.message);
  }
};

const Product = mongoose.model('Product', productSchema);

// Gọi seedProducts ngay khi model được sử dụng
(async () => {
  await Product.seedProducts(true); // Chuyển `true` để làm mới dữ liệu nếu cần
})();

module.exports = Product;
