import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToCartAPI = createAsyncThunk(
  "cart/addItemsCart",
  async ({ item, userId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart`,
      {
        userId,
        productId: item.id,
        title: item.title,
        price: item.price,
        cover: item.cover,
      }
    );
    return response.data;
  }
);
export const getCartItems = createAsyncThunk(
  "cart/getCartData",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart?userId=${userId}`
    );
    return response.data;
  }
);
export const cartItemsDelete = createAsyncThunk(
  "cart/deleteitem",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart/${id}`
    );
    return response.data;
  }
);
export const cartQuntityIncrement = createAsyncThunk(
  "cart/quntityIncrement",
  async (cartId) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart/${cartId}`,
      { type: "inc" }
    );
    return response.data;
  }
);
export const cartQuntityDecrement = createAsyncThunk(
  "cart/quntityDecrement",
  async (cartId) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart/${cartId}`,
      { type: "dec" }
    );
    return response.data;
  }
);
export const productCheckout = createAsyncThunk(
  "cart/checkout",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart/checkout/${userId}`
    );
    return response.data;
  }
);

export const productOrder = createAsyncThunk(
  "product/orders",
  async (payload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/cart/orders/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.orders;
  }
);
export const getOrder = createAsyncThunk("order/get", async (userId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/cart/orders/${userId}`
  );
  return response.data.orders;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], orders: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCartAPI.fulfilled, (state, action) => {
        (state.isLoading = false), state.items.push(action.payload);
      })
      .addCase(addItemToCartAPI.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })

      //Get Cart Data
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.items = action.payload);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      //Cart Items Delete
      .addCase(cartItemsDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartItemsDelete.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.items = state.items.filter(
            (item) => item.id !== action.payload
          ));
      })
      .addCase(cartItemsDelete.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })

      //Cart Quantity Updated increment
      .addCase(cartQuntityIncrement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartQuntityIncrement.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedItem = action.payload;
        const itemIndex = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
        }
      })
      .addCase(cartQuntityIncrement.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })

      //Cart Quantity Updated decrement
      .addCase(cartQuntityDecrement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartQuntityDecrement.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedItem = action.payload;
        const itemIndex = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
        }
      })
      .addCase(cartQuntityDecrement.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })

      //checkout page
      .addCase(productCheckout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productCheckout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(productCheckout.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })

      //order page
      .addCase(productOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.items = [];
      })
      .addCase(productOrder.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      //get order data
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
  },
});

export const { addItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
