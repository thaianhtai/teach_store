const Product = require('../../models/product.model'); // Đảm bảo bạn có model đúng

// Lấy tất cả sản phẩm
const getAllProducts = async () => {
    try {
        return await Product.find(); // Giả sử bạn dùng Mongoose hoặc ORM tương tự
    } catch (error) {
        throw new Error('Không thể lấy sản phẩm');
    }
};

// Thêm sản phẩm mới
const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (error) {
        throw new Error('Không thể thêm sản phẩm');
    }
};

// Cập nhật sản phẩm
const updateProduct = async (id, productData) => {
    try {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
        throw new Error('Không thể cập nhật sản phẩm');
    }
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
    try {
        await Product.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Không thể xóa sản phẩm');
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
