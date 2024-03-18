import React, { FC, useState } from "react";
import "./addProduct.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const AddProduct: FC = () => {
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="add_product" onClick={handleAddNewProduct}>
      <h3 className="add">Add new product</h3>
      <IoAddCircleOutline />
    </div>
  );
};
