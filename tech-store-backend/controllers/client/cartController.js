const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.', cart });
  } catch (err) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', err.message);
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart is empty.' });

    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
