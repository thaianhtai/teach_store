import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../partials/ClientSlider';
import { useAlert } from '../partials/Alert'; // Import Alert
import './HomePage.css';
import '../partials/partials.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addAlert = useAlert(); // Lấy hàm addAlert từ Alert Context

  // Gọi API lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customer/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err.message);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        addAlert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', 'warning');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/customer/cart/add',
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addAlert(response.data.message || 'Sản phẩm đã được thêm vào giỏ hàng.', 'success');
    } catch (error) {
      console.error(
        'Lỗi khi thêm sản phẩm vào giỏ hàng:',
        error.response?.data || error.message
      );
      addAlert('Lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.', 'error');
    }
  };

  return (
    <div className="homepage">
      <Slider />
      <div className="homepage-content">
        <h1>Chào mừng đến với Tech Store!</h1>
        <p>Chúng tôi cung cấp các sản phẩm công nghệ tốt nhất để mua và thuê.</p>
      </div>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="product-list">
          <h2>Sản phẩm nổi bật</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image_url || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Giá bán:</strong> {product.price.toLocaleString()} VND
                </p>
                <button
                  className="buy-button"
                  onClick={() => addToCart(product)}
                >
                  Mua ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
