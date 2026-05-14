const { User } = require("../models/userModel");
require('dotenv').config()
const jsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'User exists' });
    if (!name || !email || !password) {
      return res.status(400).json({ message: "enter all the detils", success: false })
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: 'customer' });
    res.json({ message: 'User created', success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const adminRegister = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;
    
    // Check Secret Key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Secret Key' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Admin already exists' });
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter all details", success: false })
    }

    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({ 
      name, 
      email, 
      password: hashed, 
      role: 'admin' 
    });

    res.status(201).json({ message: 'Admin account created successfully', success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    const OK = await bcrypt.compare(password, user.password);
    if (!OK) {
      return res.status(400).json({ success: false, message: "Password is incorrect" })
    }
    const token = jsonWebToken.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
    res.json({
      token,
      message: "Successfully login",
      success: true,
      username: user.name,
      userId: user.id,
      userEmail: user.email,
      role: user.role,
      status: user.status
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ success: false, message: "Admin not found" })
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied. Not an admin." });
    }

    const OK = await bcrypt.compare(password, user.password);
    if (!OK) {
      return res.status(400).json({ success: false, message: "Password is incorrect" })
    }

    const token = jsonWebToken.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '7d' })
    res.json({
      token,
      message: "Admin logged in successfully",
      success: true,
      username: user.name,
      role: user.role
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const checkUserExists = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, exists: false });
    res.status(200).json({ success: true, exists: true });
  } catch (error) {
    res.status(500).json({ success: false, exists: false });
  }
};

module.exports = { registerUser, loginUser, getUserCount, adminRegister, adminLogin, getAllUsers, deleteUser, checkUserExists };