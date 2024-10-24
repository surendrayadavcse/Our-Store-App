const mongoose = require('mongoose');

const prodSchema=mongoose.Schema({
  title:String,
  price:Number,
  description:String,
  category:String,
  image:String,
  rating:Number,



})
const productModel=mongoose.model("products",prodSchema)
module.exports=productModel