import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';
import { useAlert } from '../../../components/client/partials/Alert'; // Import hook useAlert

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: '',
    image_url: '',
  });

  const addAlert = useAlert(); // Sử dụng hook useAlert để lấy function addAlert

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      addAlert('Không thể tải sản phẩm. Vui lòng thử lại sau.', 'error');
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      addAlert('Không thể tải danh mục. Vui lòng thử lại sau.', 'error');
    }
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/products', formData);
      fetchProducts();
      setShowForm(false);
      setFormData({ product_id: '', name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      addAlert('Không thể thêm sản phẩm. Vui lòng thử lại sau.', 'error'); // Thông báo lỗi khi thêm sản phẩm thất bại
    }
  };

  // Sửa sản phẩm
  const handleEditProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/products/${editProduct.product_id}`, formData);
      fetchProducts();
      setShowForm(false);
      setFormData({ product_id: '', name: '', description: '', price: '', stock_quantity: '', category: '', image_url: '' });
      setEditProduct(null);
    } catch (error) {
      console.error('Error editing product:', error);
      addAlert('Không thể sửa sản phẩm. Vui lòng thử lại sau.', 'error'); // Thông báo lỗi khi sửa sản phẩm thất bại
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      addAlert('Không thể xóa sản phẩm. Vui lòng thử lại sau.', 'error'); // Thông báo lỗi khi xóa sản phẩm thất bại
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      handleEditProduct();
    } else {
      handleAddProduct();
    }
  };

  return (
    <div className="product-management">
      <h2>Quản Lý Sản Phẩm</h2>
      <button className="add-product-btn" onClick={() => setShowForm(true)}>
        Thêm Sản Phẩm
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />

          <label>Mô tả:</label>
          <input type="text" name="description" value={formData.description} onChange={handleFormChange} />

          <label>Giá:</label>
          <input type="number" name="price" value={formData.price} onChange={handleFormChange} required />

          <label>Số lượng:</label>
          <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleFormChange} required />

          <label>Danh mục:</label>
          <select name="category" value={formData.category} onChange={handleFormChange} required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Ảnh sản phẩm:</label>
          <input type="url" name="image_url" value={formData.image_url} onChange={handleFormChange} />

          <button type="submit">Lưu</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => setEditProduct(product)}>Sửa</button>
                <button onClick={() => handleDeleteProduct(product.product_id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
