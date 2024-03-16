import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewOrdersType, OrdersType, ProductsType } from "../../../types";

export const getOrders = createAsyncThunk(
  "cart/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/orders`);
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (orderData: NewOrdersType, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/orders", orderData);
      return res.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
