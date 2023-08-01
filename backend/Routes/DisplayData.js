const express=require('express')
const router=express.Router();

router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.fooditems, global.food_category)
        res.send([global.fooditems,global.food_category])
    } catch(error){
           console.log(error.message);
           res.send("Server Error")
    }


})

module.exports =router;