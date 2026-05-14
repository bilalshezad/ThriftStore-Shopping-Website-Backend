const express = require('express');
const { registerUser, loginUser, getUserCount, adminRegister, adminLogin, getAllUsers, deleteUser, checkUserExists } = require('../controllers/userController');
const Router = express.Router();

Router.post('/register', registerUser);
Router.post('/login', loginUser);
Router.get('/count', getUserCount);
Router.get('/all', getAllUsers);
Router.delete('/delete/:id', deleteUser);
Router.get('/check-existence/:id', checkUserExists);

// Admin Specific
Router.post('/admin/register', adminRegister);
Router.post('/admin/login', adminLogin);

module.exports = Router;