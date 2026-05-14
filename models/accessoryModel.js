const mongoose = require('mongoose')

const AccessorySchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true,
    },
    price : {
      type : Number,
      required : true,
    }, 
    category : {
      type : String,
      required : true,
    },
    image : {
      type : [String],
      required : true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    Size: {
      type: [String],
      required: false
    },
    Gender: {
      type: String,
      default: 'Unisex'
    }
  },
  {
    timestamps : true,
  }
) 
const Accessory = mongoose.model("Accessory" , AccessorySchema)
module.exports = {Accessory}
