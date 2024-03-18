import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../login";
import { SingnUp } from "../signup";
import { LogOutHOC } from "../HOC/LogOutHOC";
import { AuthHOC } from "../HOC/AuthHOC";
import { Home } from "../Home";
import { UserDetails } from "../user";
import { Cart } from "../cart";
import { Orders } from "../orders";
import { AddNew } from "../addProduct";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LogOutHOC>
              <Login />
            </LogOutHOC>
          }
        />
        <Route
          path="/signup"
          element={
            <LogOutHOC>
              <SingnUp />
            </LogOutHOC>
          }
        />
        <Route
          path="/home"
          element={
            <AuthHOC>
              <Home />
            </AuthHOC>
          }
        />

        <Route
          path="/user-details"
          element={
            <AuthHOC>
              <UserDetails />
            </AuthHOC>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthHOC>
              <Cart />
            </AuthHOC>
          }
        />
        <Route
          path="/orders"
          element={
            <AuthHOC>
              <Orders />
            </AuthHOC>
          }
        />
        <Route
          path="/add-product"
          element={
            <AuthHOC>
              <AddNew />
            </AuthHOC>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
