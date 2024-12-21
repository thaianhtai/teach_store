import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../partials/Alert'; // Import Alert
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null); // Lưu trữ dữ liệu giỏ hàng
  const [loading, setLoading] = useState(true); // Hiển thị trạng thái tải
  const [error, setError] = useState(null); // Lưu trữ thông báo lỗi
  const [redirected, setRedirected] = useState(false); // Ngăn hiển thị cảnh báo liên tục
  const addAlert = useAlert(); // Sử dụng Alert
  const navigate = useNavigate(); // Sử dụng để điều hướng

  // Gọi API để lấy giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage

      if (!token) {
        if (!redirected) {
          setRedirected(true); // Đánh dấu đã chuyển hướng
          addAlert('Bạn cần đăng nhập để xem giỏ hàng.', 'warning');
          navigate('/login'); // Chuyển hướng về trang đăng nhập
        }
        return; // Dừng việc tiếp tục gọi API
      }

      try {
        const response = await axios.get('http://localhost:5000/api/customer/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const validItems = response.data.items.filter((item) => item.product); // Lọc sản phẩm null
        setCart({ ...response.data, items: validItems }); // Cập nhật giỏ hàng với sản phẩm hợp lệ
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải giỏ hàng:', err.message);
        setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate, addAlert, redirected]);

  if (loading) {
    return <p>Đang tải giỏ hàng...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!cart || !cart.items.length) {
    return <p>Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div className="cart-page">
      <h1>Giỏ hàng của bạn</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={item.product.image_url || 'https://via.placeholder.com/150'}
              alt={item.product.name || 'Unnamed Product'}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.product.name}</h3>
              <p>{item.product.description}</p>
              <p>
                <strong>Số lượng:</strong> {item.quantity}
              </p>
              <p>
                <strong>Giá:</strong> {item.product.price.toLocaleString()} VND
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Tổng cộng:</h2>
        <p>
          <strong>
            {cart.items
              .reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )
              .toLocaleString()}{' '}
            VND
          </strong>
        </p>
      </div>
    </div>
  );
};

export default CartPage;
