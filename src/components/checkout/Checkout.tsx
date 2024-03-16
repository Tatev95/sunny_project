import React, { FC } from "react";
import "./checkout.css";
import { useSelector } from "react-redux";
import { usersSelector } from "../../store/login/login-selector";
import { loginProvider } from "../../providers/login-provider";
import { LiaCcVisa } from "react-icons/lia";
import { LiaCcMastercard } from "react-icons/lia";
import { FaStripe } from "react-icons/fa6";
import {
  cartListSelector,
  cartProductIdSelector,
  productCountSelector,
} from "../../store/cart/cart-selector";
import { deleteProductFromCart } from "../../services/requests/cart/requests";
import { useAppDispatch } from "../../store";
import { addOrder } from "../../services/requests/order/requests";
import { setProductCount } from "../../services/requests/products/request";

interface CheckoutProps {
  handleCloseCheckOut: () => void;
}

export const Checkout: FC<CheckoutProps> = ({ handleCloseCheckOut }) => {
  const dispatch = useAppDispatch();
  const users = useSelector(usersSelector);

  const productId = useSelector(cartProductIdSelector);
  const products = useSelector(cartListSelector);
  const productCount = useSelector(productCountSelector);
  
  const currentProduct = products?.find((product) => product.id === productId);

  const userId = loginProvider.getUserId() + "";
  const currentUser = users?.find((user) => user?.id === userId);
  const amount =
    "$" +
    (productCount !== 0 ? productCount : currentProduct?.count ?? 0) *
      (currentProduct?.price ?? 0);

  const handleCheckOut = () => {
    const oldCount = currentProduct?.count || 0;

    dispatch(setProductCount({...currentProduct, id: productId, count: oldCount - productCount }));
  
    dispatch(deleteProductFromCart(productId));
    handleCloseCheckOut();
    alert("Success");
    const newOrder = {
      time: new Date().toISOString(),
      amount,
      count: productCount
    };
    dispatch(addOrder({ ...newOrder, userId }));
    window.location.reload();
  };
  


  return (
    <div className="checkout_content">
      <div className="checkout_header">
        <h2>confirm</h2>
        <button className="close" onClick={handleCloseCheckOut}>
          X
        </button>
      </div>

      <div className="checkout">
        <input
          className="data_input"
          type="text"
          value={currentUser?.firstName}
        />
        <input
          className="data_input"
          type="text"
          value={currentUser?.lastName}
        />
        <input className="data_input" type="text" value={currentUser?.email} />
        <input className="data_input" type="text" value={currentUser?.phone} />
        <input className="data_input" type="text" placeholder="CARD NUMBER" />
        <input
          className="data_input"
          type="text"
          placeholder="Expiry 06/2024"
        />
        <input
          className="data_input"
          type="text"
          placeholder="Amount"
          value={amount}
        />
        <LiaCcVisa className="card_type" />
        <LiaCcMastercard className="card_type" />
        <FaStripe className="card_type" />
      </div>
      <button onClick={handleCheckOut}>CHECKOUT</button>
    </div>
  );
};
