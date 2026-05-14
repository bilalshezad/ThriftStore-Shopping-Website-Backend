const mongoose = require('mongoose');

const ProductOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shoes',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  size: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: [ProductOrderSchema],
      required: true,
      validate: [(val) => val.length > 0, 'At least one product is required.'],
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };