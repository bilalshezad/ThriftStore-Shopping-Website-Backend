const express = require('express');
const { getAllAccessories, addAccessory, deleteAccessory, updateAccessory  } = require('../controllers/accessoryController');
const Router = express.Router();

Router.get('/getallaccessories', getAllAccessories);
Router.post('/admin/addaccessory', addAccessory);
Router.put('/admin/accessory/:id', updateAccessory);
Router.delete('/admin/accessory/:id', deleteAccessory);

module.exports = Router
