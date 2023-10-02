import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState: {
        products: [],
        quantity : 0,
        total : 0,
        isFetching : false,
       error : false
    },
    reducers: {
       
            addProduct: (state, action) => {
                const newItem = action.payload;
              
                // Check if the item already exists in the cart
                const existingItem = state.products.find((item) => item.ProductId === newItem.ProductId);
              
                if (existingItem) {
                  // If the item exists, increment its quantity
                  existingItem.quantity += newItem.quantity;
                } else {
                  // If the item doesn't exist, add it to the cart
                  
                  state.products.push(newItem);
                  state.quantity +=1;
                  state.total = state.products.reduce(
                  (total, item) => total + item.Price * item.quantity,
                  0);
                }
              
                // Recalculate the total for all options
                
              
                state.total = state.products.reduce(
                  (total, item) => total + item.Price * item.quantity,
                  0
                );
              
        },
        clearCart: (state) => {
            // Clear the cart items when the user logs out
            state.products = [];
            state.quantity = 0;
  state.total = 0;
          },
            removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.ProductId !== action.payload
      );

      state.total = state.products.reduce(
        (total, product) => total + product.Price * product.quantity,
        0
      );
      state.quantity = state.products.length;
    },
    updateCart : (state,action) =>{
      state.products = action.payload;
       state.quantity = state.products.length;
    
      state.total = state.products.reduce(
        (total, item) => total + item.Price * item.quantity,
        0
      );
      state.isFetching = false;
    },
        fetchProduct : (state) =>{
      state.isFetching = true;
      state.error = false
    },
    
          }
    }

)
export const {addProduct, clearCart, removeProduct,updateCart, fetchProduct} = cartSlice.actions;
export default  cartSlice.reducer;