import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const cartSelector = (state: RootState) => state.cart;

export const cartListSelector = createSelector(
  cartSelector,
  (cart) => cart.producst
);

export const cartProductIdSelector = createSelector(
  cartSelector,
  (cart) => cart.productId
);

export const productCountSelector = createSelector(
  cartSelector,
  (cart) => cart.productCount
);
