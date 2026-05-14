const mongoose = require('mongoose')

const ShoesSchema = new mongoose.Schema(
  {
    img: [String],
    price : {
      type : Number,
      required : true,
    } , 
    h1 : {
      type : String,
      required : true,
    },
    subtitle : {
      type : String,
      required : true,
    },
    description : {
      type : String,
      required : true
    },
    category : {
      type : String,
      required : true,
      enum : ["sneakers" ,  "urbanshoes" , "jogers" , "converse" , "slides"]
    },
    Gender : {
      type : String,
      required : true,
      enum : ["Men" , "Women" , "Unisex"]
    },
    Size : {
      type : [Number],
      required : true,
    },
    stock: {
    type: Number,
    required: true,
    default: 0
  }
  },
  {
    timestamps : true,
  }
) 
const Shoes = mongoose.model("Shoes" , ShoesSchema)
module.exports = {Shoes}