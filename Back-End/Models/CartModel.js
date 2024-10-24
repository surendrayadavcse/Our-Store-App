
const mongoose=require('mongoose')
const cartItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  });
  
  const Cart = mongoose.model('Cart', cartItemSchema);
  module.exports=Cart
  