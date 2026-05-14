const { Order } = require('../models/orderModel');
const { Shoes } = require('../models/shoesModel');
const { Accessory } = require('../models/accessoryModel');

const createOrder = async (req, res) => {
  try {
    const { products, customer } = req.body;

    if (!Array.isArray(products) || products.length === 0 || !customer) {
      return res.status(400).json({ message: 'Products and customer details are required.' });
    }

    // Deduct stock for each product
    for (const item of products) {
      let product = await Shoes.findById(item.productId);
      if (!product) {
        product = await Accessory.findById(item.productId);
      }

      if (product) {
        if (product.stock < item.quantity) {
          return res.status(400).json({ 
            message: `Insufficient stock for ${product.h1 || product.name}. Only ${product.stock} left.` 
          });
        }
        product.stock -= item.quantity;
        await product.save();
      }
    }

    const order = await Order.create({ products, customer });
    res.status(201).json({ order, message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not place order.', error: error.message });
  }
};

const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch order count.', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders.', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ success: true, order, message: `Order status updated to ${status}.` });
  } catch (error) {
    res.status(500).json({ message: 'Could not update order status.', error: error.message });
  }
};

const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'delivered' });
    const totalRevenue = orders.reduce((total, order) => {
      const orderTotal = order.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
      return total + orderTotal;
    }, 0);

    res.status(200).json({ success: true, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Could not calculate revenue.', error: error.message });
  }
};

module.exports = { createOrder, getOrderCount, getOrders, updateOrderStatus, getRevenue };