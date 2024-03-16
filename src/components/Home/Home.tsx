import React, { FC } from "react";
import { MainLayout } from "../mainLayout/MainLayout";
import { ProductList } from "../productList";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { Search, Sort } from "../filters";

export const Home: FC = () => {
  const navigate = useNavigate();

  const handleGoOrders = () => {
    navigate("/orders");
  };
  return (
    <>
      <div className="filter_content">
        <Sort />
        <Search />
      </div>
      <ProductList />

      <h3 className="orders" onClick={handleGoOrders}>
        MY ORDERS
      </h3>
    </>
  );
};
