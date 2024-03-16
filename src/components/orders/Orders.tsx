import React, { FC, useEffect } from "react";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { ordersSelector } from "../../store/order/order-selector";
import { getOrders } from "../../services/requests/order/requests";
import "./orders.css";
import { loginProvider } from "../../providers/login-provider";

export const Orders: FC = () => {
  const orders = useSelector(ordersSelector);
  const dispatch = useAppDispatch();

  const userId = loginProvider.getUserId()

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const addFourHours = (timeString: string): string => {
    const orderTime = new Date(timeString);
    orderTime.setHours(orderTime.getHours() + 4); 

    return `${orderTime.getFullYear()}-${String(orderTime.getMonth() + 1).padStart(2, '0')}-${String(orderTime.getDate()).padStart(2, '0')} ${String(orderTime.getHours()).padStart(2, '0')}:${String(orderTime.getMinutes()).padStart(2, '0')}`;
  };

  const currentUsersOrder = orders?.filter((order)=> order.userId === userId)

  return (
    <div className="orders_list">
      <h4>MY ORDERS</h4>
      {Array.isArray(currentUsersOrder) && currentUsersOrder?.length > 0 ? (
        currentUsersOrder?.map((order) => (
          <div className="order" key={order.id}>
            <p>Product count: {order.count}</p>
            <p>Total amount: {order.amount}</p>
            <p>Date: {addFourHours(order.time.slice(0, 16).replace("T", " "))}</p>
          </div>
        ))
      ) : (
        <div>Order IS EMPTY</div>
      )}
    </div>
  );
};
