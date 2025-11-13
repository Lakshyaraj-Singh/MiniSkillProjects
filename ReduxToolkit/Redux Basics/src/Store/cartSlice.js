import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addItems:(state,action)=>{
            state.push(action.payload);
        }
    }
})

export default cartSlice.reducer;
