const express = require('express');
const { createOrder, getOrderCount, getOrders, updateOrderStatus, getRevenue } = require('../controllers/orderController');
const Router = express.Router();

Router.post('/create', createOrder);
Router.get('/count', getOrderCount);
Router.get('/all', getOrders);
Router.get('/revenue', getRevenue);
Router.put('/status/:id', updateOrderStatus);

module.exports = Router;
