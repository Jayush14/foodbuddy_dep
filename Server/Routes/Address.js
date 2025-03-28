const express=require('express')
const router=express.Router();
const axios = require("axios");

router.get("/pincode",async (req,res)=>{
    const { pincode } = req.body;
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];
  
      if (data.Status === "Success") {
        return res.json(data.PostOffice);
      } else {
        return res.status(404).json({ message: "Invalid Pincode" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

module.exports =router;