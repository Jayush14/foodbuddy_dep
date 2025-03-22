const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://gofood:EEdKc3fo5UctxhqZ@cluster0.zpusfds.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");

    // Fetch 'food_items' collection
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    // Fetch 'foodCategory' collection
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    // Store in global variables
    global.food_items = data;
    global.foodCategory = catData;

    console.log("✅ Data Fetched & Stored in Global Variables");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

// Export the function
module.exports = mongoDB;
