import React, { FC, useEffect } from "react";
import { User } from "../../../user";
import { loginProvider } from "../../../../providers/login-provider";
import "./header.css";
import { FaShoePrints } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartListSelector } from "../../../../store/cart/cart-selector";
import { getCart } from "../../../../services/requests/cart/requests";
import { useAppDispatch } from "../../../../store";
import { IoCart } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartProducts = useSelector(cartListSelector);
  const handleLogout = () => {
    loginProvider.removeToken();
    window.location.reload();
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleGoHome}>
        <p className="shop_title">Shop</p>
        <FaShoePrints />
        <GiClothes />
      </div>

      <User />
      {cartProducts?.length > 1 ? (
        <IoCart className="cart" onClick={handleGoToCart} />
      ) : (
        <IoCartOutline className="cart" onClick={handleGoToCart} />
      )}

      <button className="log_out" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
