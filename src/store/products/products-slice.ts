import { createSlice } from "@reduxjs/toolkit";

import { ProductsType, UserType } from "../../types";
import {
  addProduct,
  getProducts,
} from "../../services/requests/products/request";

type productsState = {
  producst: ProductsType[];
  isLoading: boolean;
  currentProduct: {} | null;
  productId: string | null;
  searchText: string;
  count: number;
};

const initialState: productsState = {
  producst: [],
  isLoading: false,
  currentProduct: {},
  productId: "",
  searchText: "",
  count: 0,
};

const producstSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setId: (state: any, action) => {
      state.productId = action.payload;
    },
    setProducts: (state, action) => {
      state.producst = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchText = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.producst = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.producst = action.payload;
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setId, setProducts, setSearchValue, setCount } =
  producstSlice.actions;

export default producstSlice.reducer;
