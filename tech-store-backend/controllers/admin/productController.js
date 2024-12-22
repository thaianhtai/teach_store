const productService = require('../../services/admin/productService'); // Đảm bảo bạn đã nhập đúng service

// Lấy tất cả sản phẩm
const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error });
    }
};

// Thêm sản phẩm mới
const addProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Sản phẩm đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
    }
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
