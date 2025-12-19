import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/product-cart/productCartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
