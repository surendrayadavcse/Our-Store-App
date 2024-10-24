import React, { useEffect, useState } from 'react'
// import { Products } from '../service/userservice/userservice'
import { useDispatch, useSelector } from 'react-redux'
import { productlist } from './reduxtoolkit/productsSlice'
// import { store } from './reduxtoolkit/store'
function ProductList() {
    const dispatch=useDispatch()
    const products=useSelector((state)=>state.products.items)
    console.log(products)


 useEffect(()=>{
    async function getProducts(){
        try{
            const productsdata=await Products()
            console.log(productsdata)
            dispatch(productlist(productsdata))

        }
        catch(err){
         console.log(err,"hello i am errors")
        }

    }
    getProducts()
 },[dispatch])
  return (
    <div>
     
      <h1>{products[0].title}</h1>
     
    </div>
  )
}

export default ProductList