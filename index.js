const express = require('express');
const Dotenv = require('dotenv');
const mongoose = require('mongoose');
const Venderroutes = require('./Routes/venderRoutes')
const bodyParser=require('body-parser')
const firmRoutes = require('./Routes/firmRoutes')
const productRoutes = require('./Routes/productRoutes')
const cors = require('cors');
const path = require('path')

const app = express();

const PORT = 4000;

Dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected to Cluster1");
  console.log("📂 Connected to DB:", mongoose.connection.name);
})
.catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use(bodyParser.json())
app.use('/vender',Venderroutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)

Dotenv.config();
console.log("📄 Current Mongo URI:", process.env.MONGO_URI);
console.log("🚨 process.env:", process.env);

app.listen(PORT,()=>{
    console.log("serever running successfully")
})

app.use('/home',(req,res)=>{
    res.send("<h1>welcome to suby</h1>")
})