// models/FavoriteFood.js
const mongoose = require("mongoose");

const favoriteFoodSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  foodIds: { type: Array, required: true, ref: "Food" },
  createdAt: { type: Date, default: Date.now },
});

const FavoriteFood = mongoose.model("FavoriteFood", favoriteFoodSchema);

module.exports = FavoriteFood;
