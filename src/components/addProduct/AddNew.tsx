import React, { FC, useState } from "react";
import "./addProduct.css";
import { useSelector } from "react-redux";
import { usersSelector } from "../../store/login/login-selector";
import { loginProvider } from "../../providers/login-provider";
import { useAppDispatch } from "../../store";
import { addProduct } from "../../services/requests/products/request";
import { useNavigate } from "react-router-dom";

export const AddNew: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useSelector(usersSelector);

  const userId = loginProvider.getUserId() + "";
  const currentUser = users?.find((user) => user?.id === userId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [count, setCount] = useState(0);
  const [price, setprice] = useState(0);

  const handleChange =
    (setState: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  const handleAddNewProduct = () => {
    const newProductData = {
      title,
      description,
      imageUrl,
      count,
      price,
    };
    dispatch(addProduct(newProductData));
    navigate("/home");
  };

  return (
    <div>
      {currentUser?.role === "superAdmin" ? (
        <>
          <h3 className="add">Add new product</h3>
          <div className="signup_inputs">
            <input
              onChange={handleChange(setTitle)}
              className="signup_input"
              placeholder="Title"
              value={title}
            />
            <input
              onChange={handleChange(setDescription)}
              className="signup_input"
              placeholder="Description"
              value={description}
            />
            <input
              onChange={handleChange(setImgUrl)}
              className="signup_input"
              placeholder="image url"
              value={imageUrl}
            />
            <input
              onChange={handleChange(setCount)}
              className="signup_input"
              placeholder="Count"
              value={count === 0 ? "" : count}
            />
            <input
              onChange={handleChange(setprice)}
              className="signup_input"
              placeholder="Price"
              value={price === 0 ? "" : price}
            />
          </div>
          <button onClick={handleAddNewProduct}>Add new Product</button>
        </>
      ) : (
        <div>Only Super-admin Can add new product</div>
      )}
    </div>
  );
};
