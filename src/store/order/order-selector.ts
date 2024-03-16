import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const orderSelector = (state: RootState) => state.order;

export const ordersSelector = createSelector(
  orderSelector,
  (order) => order.orders
);

export const orderLoadingSelector = createSelector(
  orderSelector,
  (order) => order.isLoading
);
