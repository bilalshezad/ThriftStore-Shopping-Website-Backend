require('dotenv').config()
const mongoose= require('mongoose')

mongoose.connect(process.env.DB)
.then(()=>{
  console.log("mongoose connected succsesfully")
})
.catch((err)=>{
  console.log("error in db connection", err)
})
module.exports = mongoose;