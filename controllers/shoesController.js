const {Shoes} = require('../models/shoesModel');
const {Accessory} = require('../models/accessoryModel');
const AddShoes = async(req , res)=>{
  try {
    const {img , price  , h1 , subtitle ,description , category, stock, Size, Gender} = req.body;
    const shoes = await Shoes.create({img, price, h1 , subtitle , description , category, stock, Size, Gender})
    res.status(200).json({ shoes,message : "Shoes Card created "})
  } catch (error) {
    res.status(400).json({message : error})
    console.log(error)
  }
}
// const getMenShoes = async(req , res)=>{
//   try {
//     const shoes = await Shoes.find({gender : "men"})
//     res.status(200).json({shoes , message : "Men Shoes Stock"})
//   } catch (error) {
//    res.status(400).json({error}) 
//   }
// }
// const getWomenShoes =  async(req ,res)=>{
//   const shoes = await Shoes.find({gender : "women"})
//   res.status(200).json({shoes , message : "Women Shoes Stock"})
// }


const getSneaker = async(req , res)=>{
  try {
    const sneakers = await Shoes.find({category : "sneakers"})
    .limit(3)
    .sort({createdAt : -1})
    res.status(200).json(sneakers)
  } catch (error) {
    res.status(400).json({message : error})
    console.log(error)
  }
}
const getJogers = async(req , res)=>{
  try {
    const jogers =  await Shoes.find({category : "jogers"})
    .limit(3)
    .sort({createdAt : -1})
    res.status(200).json(jogers)
  } catch (error) {
    res.status(400).json({message : error})
  }
}

const getConverse = async(req , res)=>{
  try {
    const converse =  await Shoes.find({category : "converse"})
    .limit(3)
    .sort({createdAt : -1})
    res.status(200).json(converse)
  } catch (error) {
    res.status(400).json({message : error})
  }
}

const getSlides = async(req , res)=>{
  try {
    const slides = await Shoes.find({category : "slides"})
    .limit(3)
    .sort({createdAt : -1})
    res.status(200).json(slides)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getUrbanShoes = async(req , res)=>{
  try {
    const UrbanShoes = await Shoes.find({category : "urbanshoes"})
    .limit(3)
    .sort({createdAt : -1})
    res.status(200).json(UrbanShoes)
  } catch (error) {
    res.status(400).json(error)
  }
}
const getAllShoes = async(req , res )=>{
  const shoes = await Shoes.find();
  res.status(200).json({shoes , message : "All shoes stock"})
}
const getCategories = async(req , res )=>{
  try {
    const categories = await Shoes.distinct('category')
    res.json({status :  200 , success : true , categories})
  } catch (error) {
    res.json({message  : error})
  }
}
const getgender = async(req , res)=>{
  try {
    const gender = await Shoes.distinct('Gender')
    res.status(200).json(["All" , ...gender])
  } catch (error) {
    res.status(400).json({message : error})
  }
}
const getSizes = async (req , res )=>{
  try{
    const allsizes = await Shoes.find().select('Size');
    const flat = allsizes.flatMap(item =>item.Size);
    const unique = [...new Set(flat)].sort((a,b)=>a-b)
    res.status(200).json(unique )
  } catch (error){
    res.status(400).json({message : error})
  }
}
const getAllsnekears = async(req , res)=>{
  try {
    const { Gender , Size } = req.query;
  
    let filter = { category: "sneakers" };
  
    if (Gender && Gender !== "All") {
      filter.Gender = Gender;
    }
    if(Size){
      const sizeNum = parseInt(Size);
      filter.Size = sizeNum
    }
    const data = await Shoes.find(filter)
    .sort({createdAt : -1})
    res.json(data);
    
  } catch (error) {
    res.json({message  : error})
  }
}
const getAlljogers = async(req , res)=>{
  try {
    const { Gender , Size } = req.query;
  
    let filter = { category: "jogers" };
  
    if (Gender && Gender !== "All") {
      filter.Gender = Gender;
    }
    if(Size){
      const sizeNum = parseInt(Size);
      filter.Size = sizeNum
    }
    const data = await Shoes.find(filter)
    .sort({createdAt : -1})
    res.json(data);
    
  } catch (error) {
    res.json({message  : error})
  }
}
const getAllConverse = async(req , res)=>{
  try {
    const { Gender , Size } = req.query;
  
    let filter = { category: "converse" };
  
    if (Gender && Gender !== "All") {
      filter.Gender = Gender;
    }
    if(Size){
      const sizeNum = parseInt(Size);
      filter.Size = sizeNum
    }
    const data = await Shoes.find(filter)
    .sort({createdAt : -1})
    res.json(data);
    
  } catch (error) {
    res.json({message  : error})
  }
}
const getAllSlides = async(req , res)=>{
  try {
    const { Gender , Size } = req.query;
  
    let filter = { category: "slides" };
  
    if (Gender && Gender !== "All") {
      filter.Gender = Gender;
    }
    if(Size){
      const sizeNum = parseInt(Size);
      filter.Size = sizeNum
    }
    const data = await Shoes.find(filter)
    .sort({createdAt : -1})
    res.json(data);
    
  } catch (error) {
    res.json({message  : error})
  }
}
const getAllUrbanShoes = async(req , res)=>{
  try {
    const { Gender , Size } = req.query;
  
    let filter = { category: "urbanshoes" };
  
    if (Gender && Gender !== "All") {
      filter.Gender = Gender;
    }
    if(Size){
      const sizeNum = parseInt(Size);
      filter.Size = sizeNum
    }
    const data = await Shoes.find(filter)
    .sort({createdAt : -1})
    res.json(data);
    
  } catch (error) {
    res.json({message  : error})
  }
}
const getSingleProduct = async(req ,res)=>{
  try{
    let product = await Shoes.findById(req.params.id);
    
    // If not found in Shoes, check Accessory
    if (!product) {
      product = await Accessory.findById(req.params.id);
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product)
  }
  catch(err){
    res.status(400).json({message : err.message})
  }
}

const deleteShoes = async (req, res) => {
  try {
    const { id } = req.params;
    await Shoes.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateShoes = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShoes = await Shoes.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product: updatedShoes, message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {AddShoes ,  getAllShoes , getSneaker  ,getSlides, getJogers , getConverse , getUrbanShoes , getgender , getCategories , getAllsnekears , getSizes , getAlljogers , getAllConverse , getAllSlides , getAllUrbanShoes , getSingleProduct, deleteShoes, updateShoes }
