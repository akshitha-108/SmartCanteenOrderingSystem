
const express = require("express");
const { v4: uuidv4 } = require('uuid'); 
const router = express.Router();
const Order = require('../models/orderModel');

const generateUniquePin = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;
  const uniquePin = generateUniquePin();

  const newOrder = new Order({
    name: currentUser.name,
    email: currentUser.email,
    userid: currentUser._id,
    orderItems: cartItems,
    orderAmount: subtotal,
    transactionId: uuidv4(),  // Use uuidv4 to generate a unique transaction ID
    uniquePin: uniquePin  // Add uniquePin to the order
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
