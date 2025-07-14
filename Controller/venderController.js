const Vendor = require('../models/vender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv')

dotEnv.config();

const secretkey = process.env.WhatIsYourName

const venderRegister = async(req,res)=>{
    const {username,email,password} = req.body

    try{
        const VenderEmail = await Vendor.findOne({email});
        if(VenderEmail){
            return res.status(400).json("Email already Existed")
        }
        const hashpasword = await bcrypt.hash(password,10)

        const newVender = new Vendor({
            username,
            email,
            password: hashpasword
        });
        await newVender.save()
        console.log("✅ Vendor saved to MongoDB:", newVender);
        res.status(201).json({message:"Vendor Register Successfull"})
        console.log("registered")
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal error server"})
    }

}

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body;

try{
    const vendor = await Vendor.findOne({email});

    if(!vendor || !(await bcrypt.compare(password, vendor.password))){
        return res.status(401).json({error: "Invalid username or password"})
    }

    const token = jwt.sign({vendorId: vendor._id}, secretkey,{expiresIn:"1h"})
    res.status(200).json({success: "Login successful",token})
    console.log(email,"this is my name",token)
}catch (error){
    console.error(error);
    res.status(500).json({error:"Internal error server"})
}

}

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    console.log("Fetched vendors:", vendors);
    res.status(200).json({ vendors });
  } catch (error) {
    console.error("Error in getAllVendors:", error);  // Detailed error log
    res.status(500).json({ error: error.message });     // Send actual error message in response
  }
};

const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id).populate('firm');

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Get Vendor Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { venderRegister, vendorLogin, getAllVendors, getVendorById }