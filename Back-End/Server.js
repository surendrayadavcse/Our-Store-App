require('dotenv').config()
require('./DB_Connection/db')
const express=require('express')
const userModel=require("./Models/UserModel")
const jwt=require('jsonwebtoken')
const productModel = require('./Models/ProductModel')
const Cart = require('./Models/CartModel')
const app=express()
const cors = require('cors');
const secretkey=process.env.SECRET_KEY 
app.use(express.json())
app.use(cors())
app.post("/register",async(req,res)=>{
    try{
        const user=req.body
        const userData=await userModel.create(user)
        console.log(userData)
        if(userData){
            res.send('user registered')
        }



    }
    catch(err){

        console.log(err)
    }
})


// app.post("/login",async(req,res)=>{
//     const {email,password}=req.body
//     try{
//         const user=await userModel.findOne({email:email})
//        if(user!==null){
//         if(user.password!==password){
//             res.send('in correct password')
//         }
//         else{
//           jwt.sign({email:email},secretkey,(err,token)=>{
//             if(!err){
//                 res.send({message:"login success",token:token})
//             }
//           })
//         }
//        }
//        else{
//         res.send('user not found')
//        }
//     }
//     catch(err){
//         console.log(err)

//     }
// })
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user !== null) {
            if (user.password !== password) {
                return res.status(400).send('Incorrect password');
            } else {
                const token = jwt.sign({ email: email, userId: user._id }, secretkey);
                return res.send({ message: "Login successful", token: token, userId: user._id });
            }
        } else {
            return res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});



app.get("/products",async(req,res)=>{
    try
    {
        // let product=req.body
        let doc=await productModel.find()
        res.send(doc)
       
    
    }
    catch(err){
      res.send(err)
    }
})

// app.post("/track",async(req,res)=>{
//     try{
//         let trackdata=req.body
//         let doc=await CartModel.create(trackdata)
//         res.send("tracked data added")
//         console.log(doc)


//     }
// catch(err){
//    res.send(err)
//     }
// })


  // Add product to cart
 // Add product to cart
// app.post('/api/cart', async (req, res) => {
//     const { productId, quantity, userId } = req.body; // Ensure userId is passed in the request body
  
//     try {
//         // Check if userId is included
//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         let cartItem = await Cart.findOne({ productId, userId });
  
//         if (cartItem) {
//             // If product already exists in cart, update the quantity
//             cartItem.quantity += quantity;
//         } else {
//             // Create a new cart item
//             cartItem = new Cart({ productId, quantity, userId });
//         }
  
//         await cartItem.save();
//         res.status(200).json(cartItem);
//     } catch (error) {
//         console.error('Error adding product to cart:', error); // Log the error for debugging
//         res.status(500).json({ message: 'Error adding product to cart', error });
//     }
// });
app.post('/api/cart', async (req, res) => {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
        return res.status(400).json({ message: 'Product ID, User ID, and quantity are required' });
    }

    try {
        let cartItem = await Cart.findOne({ productId, userId });

        if (cartItem) {
            // Update existing item
            cartItem.quantity += quantity;
        } else {
            // Create new cart item
            cartItem = new Cart({ productId, userId, quantity });
        }

        await cartItem.save();

        // Fetch the updated cart items to return
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.status(201).json({ items: cartItems }); // Return the updated items array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});


  
  // Get cart items
// Get cart items

// app.get('/api/cart', async (req, res) => {
//     const { userId } = req.query;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//     }

//     try {
//         const cartItems = await Cart.find({ userId }).populate('productId');
//         console.log('Retrieved cart items:', cartItems); // Log the items after population
//         res.status(200).json({ items: cartItems });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching cart', error });
//     }
// });
app.get('/api/cart', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        console.log('Retrieved cart items:', cartItems);
        res.status(200).json({ items: cartItems }); // Ensure you're wrapping cartItems in an items array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});


  
  // Update cart item quantity
  app.put('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    try {
      const cartItem = await Cart.findById(id);
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart', error });
    }
  });
  
  // Remove product from cart
  app.delete('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const cartItem = await Cart.findByIdAndDelete(id);
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing product from cart', error });
    }
  });
app.listen(3000,()=>{
    console.log("server running at port 3000")
})