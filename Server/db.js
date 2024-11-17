// const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const mongoURI =  "mongodb+srv://gofood:EEdKc3fo5UctxhqZ@cluster0.zpusfds.mongodb.net/gofoodmern?retryWrites=true&w=majority";

//ayush jain
const mongoDB = async () => {
  await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
    console.log(err);
        if(err) console.log("...",err)
        else{
                   console.log("connected");
                   const fetched_data=await mongoose.connection.db.collection("food_items");
                   fetched_data.find({}).toArray(async function(err,data){
                    const foodCategory=await mongoose.connection.db.collection("foodCategory");
                   foodCategory.find({}).toArray(function(err,catData){
                        if(err) console.log(err);
                        else{
                          global.food_items=data;
                          global.foodCategory=catData;
                        }


                   })
                    // if(err) console.log(err);
                    // else {
                    
                    //     global.food_items=data;
                        
                    // }
                   })
        }
  })
}  

module.exports = mongoDB;