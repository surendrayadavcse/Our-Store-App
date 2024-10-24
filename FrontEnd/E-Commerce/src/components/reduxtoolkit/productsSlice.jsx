import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import { userService } from '../../service/userservice/userservice'

let service=new userService()


export const getProducts = createAsyncThunk("products/getAllProducts",
    async()=>{
        const response=await service.getAllProducts()
        console.log("in respnse",response)
        return response
    }
)
const initialState={ items:[]}
const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{

        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.items=action.payload
        })

    }

})
// export const {productlist}=productsSlice.actions

export default productsSlice.reducer;