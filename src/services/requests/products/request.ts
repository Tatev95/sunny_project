import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductCountUpdate {
  id: string;
  count: number;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/products`);
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const setProductCount = createAsyncThunk(
  "products/setProductCount",
  async ({ id, count }: ProductCountUpdate, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`http://localhost:8080/products/${id}`, {
        count,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);
