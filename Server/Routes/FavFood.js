// routes/api.js
const express = require('express');
const router = express.Router();
const FavoriteFood = require('../models/FavoriteFood');
const User = require('../models/Users');

router.post('/AddFavFood', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const foodId = req.body.FoodId;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const favoriteFood = await FavoriteFood.findOne({ userId: user._id });
    if (favoriteFood) {
      // User already has a favorite food document, add new food item to it
      favoriteFood.foodIds.push(foodId);
      await favoriteFood.save();
    } else {
      // User doesn't have a favorite food document, create a new one
      const newFavoriteFood = new FavoriteFood({
        userId: user._id,
        foodIds: [foodId]
      });
      await newFavoriteFood.save();
    }

    res.send('Favorite food added successfully');
  } catch (error) {
    console.log(error.message);
    res.send('Server Error');
  }
});

router.post('/GetFavFood', async (req, res) => {
    try {
      const userEmail = req.body.email;
  
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const favoriteFood = await FavoriteFood.findOne({ userId: user._id });
      if (!favoriteFood) {
        return res.status(404).send('No favorite food items found');
      }
  
    //   const foodIds = favoriteFood.foodIds;
      res.send(favoriteFood);
    } catch (error) {
      console.log(error.message);
      res.send('Server Error');
    }
  });


  router.post('/RemoveFavFood', async (req, res) => {
    try {
      const userEmail = req.body.email;
      const foodId = req.body.FoodId;
  
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const favoriteFood = await FavoriteFood.findOne({ userId: user._id });
      if (!favoriteFood) {
        return res.status(404).send('No favorite food items found');
      }
  
      const index = favoriteFood.foodIds.indexOf(foodId);
      if (index === -1) {
        return res.status(404).send('Food ID not found in favorite food items');
      }
      favoriteFood.foodIds = favoriteFood.foodIds.filter((id) => id !== null);
      favoriteFood.foodIds.splice(index, 1);
      await favoriteFood.save();
  
      res.send('Food ID removed from favorite food items');
    } catch (error) {
      console.log(error.message);
      res.send('Server Error');
    }
  });

module.exports = router;