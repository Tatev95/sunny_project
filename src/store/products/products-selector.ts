import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const productsSelector = (state: RootState) => state.products;

export const productSelector = createSelector(
  productsSelector,
  (producst) => producst.producst
);


export const productIdSelector = createSelector(
  productsSelector,
  (producst) => producst.productId
);

export const searchTextSelector = createSelector(
  productsSelector,
  (producst) => producst.searchText
);

export const CounttSelector = createSelector(
  productsSelector,
  (producst) => producst.count
);


