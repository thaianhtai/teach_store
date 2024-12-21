const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

exports.addToCartService = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found.');

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  return cart;
};
