const mongoose = require('mongoose');

(async function connectDb(){
    try{
    await mongoose.connect("mongodb+srv://venkatasurendra70:Surendra%40639@ecommerce-cluster.vz5yq.mongodb.net/E-Commerce")
    console.log('connected db successfully')
    }
    catch(err){
        console.log("some issue while connectiong to db",err)

    }
})();