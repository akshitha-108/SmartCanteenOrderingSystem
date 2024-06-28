const express = require("express");
const db = require('./db')
const Menu = require("./models/menuModel")
const app = express();

const menusRoute = require('./routes/menusRoute')

const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/menus/',menusRoute)
app.use('/api/users/',userRoute)
app.use('/api/orders/',ordersRoute)
app.use('/api/menus/deletemenu',menusRoute)
const generateUniquePin = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Assuming you have something like this in your backend
app.post('/api/orders/placeorder', async (req, res) => {
    // ... (your existing logic)
  
    const uniquePin = generateUniquePin(); // Generate unique PIN
    const order = {
      // ... (other order details)
      uniquePin: uniquePin,
    };
  
    // Save order to the database, etc.
  
    res.json({ success: true, order: order }); // Send uniquePin in the response
  });
  
app.get("/",(req,res) =>
{
    res.send("Server Working"+ port);
 
});


const port = process.env.PORT || 8000;

app.listen(port, () => 'Server running on port');
