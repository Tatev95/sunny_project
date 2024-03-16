import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from "./login/login-slice";
import signupReducer from "./singnUp/signUp-slice";
import productsReducer from "./products/products-slice";
import cartReducer from "./cart/cart-slice";
import orderReducer from "./order/order-slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
