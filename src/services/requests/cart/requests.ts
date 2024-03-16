import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsType } from "../../../types";

export const getCart = createAsyncThunk(
  "cart/gatCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/cart`);
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async (productData: ProductsType, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/cart", productData);
      return res.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${productId}`, {
        method: "DELETE",
      });
      return productId;
    } catch (e) {
      rejectWithValue("Error deleting user");
    }
  }
);
