const express=require('express')
const session=require('express-session')
const router=express.Router();
const User=require('../models/Users')
const { body, validationResult } = require('express-validator');
const jwt= require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const jwtSecret="abcdefghijklmnopqrstuvwxyzhaha$#"
const isAuthenticated = require('../Middleware/authMiddleware');
// SignUP user

router.post("/Createuser",[
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password','incorrect password').isLength({ min: 5 })]
,async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt= await bcrypt.genSalt(10);
  let secPasssword= await bcrypt.hash(req.body.password, salt)
  try{
       await User.create({
            name: req.body.name,
            password: secPasssword,
            email:req.body.email
        })
    res.json({success:true});

  }    catch(error){
    console.log(error);
    res.json({success:false});
  }
})



//Login users

router.post("/loginuser", [
  body('email').isEmail(),
  body('password','incorrect password').isLength({ min: 5 })] , async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let email=req.body.email;
    try{
        let userData= await User.findOne({email});
        if(!userData)
        {
          return res.status(400).json({ errors:"Try logging in with correct credentials" })
        }
         const pwdCompare= await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare)
        {
          return res.status(400).json({ errors:"Try logging in with correct credentials" })
        }
       const authToken = jwt.sign({ id: userData.id }, jwtSecret, {
         expiresIn: "1d"
       });
       
        req.session.user= {
          userId:userData.id,
          email:userData.email,
          name:userData.name,
          authToken:authToken
        }

        return res.json({success:true, message:"Login Successfull"});
      
  
    }  catch(error){
      console.log(error);
      res.json({success:false});
    }
  })

//continue with google

  router.post("/continueWithGoogle",async(req,res)=>{
    const decoded = jwt.decode(req.body.token, jwtSecret);
     console.log(decoded);
    let email=decoded.email;
    try{
        let userData= await User.findOne({email});
        if(!userData)
        {
          const salt= await bcrypt.genSalt(10);
          let secPasssword= await bcrypt.hash("123456", salt)
          let user= await User.create({
            name: decoded.name,
            password: secPasssword,
            email:decoded.email
        });
        userData = user;
        }
        
        req.session.user= {
          userId:userData.id,
          email:userData.email,
          name:userData.name
        }

        return res.json({success:true, message:"Login Successfull"});
      
  
    }  catch(error){
      console.log(error);
      res.json({success:false});
    }
  })

  //get user details

  router.get("/getUserDetails",isAuthenticated,async(req,res)=>{

    try{
        let userData= await User.findById(req.session.user.userId);
        if(!userData)
        {
          return res.status(400).json({ errors:"User not found" })
        }
        return res.json({success:true,user:userData});
      
  
    }  catch(error){
      console.log(error);
      res.json({success:false});
    }
  })

  router.get("/logout", async (req,res)=>{
    req.session.destroy();
    res.json({success : true , message: "logged out successfully"});
  })

module.exports=router;