const express  = require('express')
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors ({
  origin : ["http://localhost:5173",
  "http://localhost:5174" , "http://localhost:5175"]
}))
const mongooseConnection = require('./config/mongoose')
require('dotenv').config()
const UserRoutes = require('./routes/userRoutes');
const ShoesRoutes = require('./routes/shoesRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const AccessoryRoutes = require('./routes/accessoryRoutes');
const authToken = require('./middleware/authToken');
const { Shoes } = require('./models/shoesModel');
app.use('/user', UserRoutes);
app.use('/orders', OrderRoutes);
app.use('/', ShoesRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use('/', AccessoryRoutes);
app.listen(process.env.PORT, ()=>{
  console.log("Server is running on Port", process.env.PORT);
}) 
