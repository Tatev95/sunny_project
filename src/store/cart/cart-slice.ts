import { createSlice } from "@reduxjs/toolkit";

import { ProductsType, UserType } from "../../types";
import { getProducts } from "../../services/requests/products/request";
import {
  addToCart,
  deleteProductFromCart,
  getCart,
} from "../../services/requests/cart/requests";

type productsState = {
  producst: ProductsType[];
  isLoading: boolean;
  currentProduct: {} | null;
  productId: string;
  product: {} | null;
  productCount: number
};

const initialState: productsState = {
  producst: [],
  isLoading: false,
  currentProduct: {},
  productId: "",
  product: {},
  productCount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setId: (state: any, action) => {
      state.productId = action.payload;
    },
    setProductCount: (state: any, action) => {
      state.productCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.producst = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.producst = action.payload;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.producst = state.producst.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      console.log("reject delete");
    });
  },
});

export const { setId,setProductCount } = cartSlice.actions;

export default cartSlice.reducer;
