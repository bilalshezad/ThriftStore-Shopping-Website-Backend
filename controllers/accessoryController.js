const {Accessory} = require('../models/accessoryModel');

const getAllAccessories = async(req , res )=>{
  try {
    const accessories = await Accessory.find().sort({createdAt : -1});
    res.status(200).json(accessories)
  } catch (error) {
    res.status(400).json({message : error.message})
  }
}

const addAccessory = async(req, res) => {
  try {
    const {name, price, category, image, stock, Size, Gender} = req.body;
    const accessory = await Accessory.create({name, price, category, image, stock, Size, Gender});
    res.status(200).json({accessory, message: "Accessory added successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}
const deleteAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    await Accessory.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Accessory deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccessory = await Accessory.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product: updatedAccessory, message: "Accessory updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {getAllAccessories, addAccessory, deleteAccessory, updateAccessory}
