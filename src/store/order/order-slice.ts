import { createSlice } from "@reduxjs/toolkit";
import { OrdersType } from "../../types";
import {
  deleteProductFromCart,
  getCart,
} from "../../services/requests/cart/requests";
import { addOrder, getOrders } from "../../services/requests/order/requests";

type ordersState = {
  orders: OrdersType[];
  isLoading: boolean;
};

const initialState: ordersState = {
  orders: [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(addOrder.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
