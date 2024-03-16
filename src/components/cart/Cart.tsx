import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartListSelector } from "../../store/cart/cart-selector";
import { useAppDispatch } from "../../store";
import {
  deleteProductFromCart,
  getCart,
} from "../../services/requests/cart/requests";
import "./cart.css";
import { CiCircleRemove, CiShoppingCart } from "react-icons/ci";
import { Checkout } from "../checkout";
import { setId, setProductCount } from "../../store/cart/cart-slice";
import { loginProvider } from "../../providers/login-provider";

interface SelectedCounts {
  [productId: string]: number;
}

export const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(cartListSelector);
  const userId = loginProvider.getUserId() + "";

  const [selectedCounts, setSelectedCounts] = useState<SelectedCounts>({});
  const [openCheckOut, setOpenCheckOut] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    productId: string
  ) => {
    const newCount = parseInt(e.target.value);
    setSelectedCounts({
      ...selectedCounts,
      [productId]: newCount,
    });
    dispatch(setProductCount(newCount));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(deleteProductFromCart(id));
  };

  const handleOpenCheckout = (id: string) => {
    setOpenCheckOut(true);
    dispatch(setId(id));
  };

  const handleCloseCheckOut = () => {
    setOpenCheckOut(false);
  };

  const currentUsersProducts = products?.filter(
    (product) => product.userId === userId
  );

  const uniqueTitles = new Set();

  const uniqueProducts = currentUsersProducts.filter((product) => {
    if (uniqueTitles.has(product.title)) {
      return false;
    }
    uniqueTitles.add(product.title);
    return true;
  });

  return (
    <div>
      <p>CART</p>
      <CiShoppingCart />

      <div className="cart">
        {Array.isArray(uniqueProducts) && uniqueProducts.length > 0 ? (
          uniqueProducts.map((product) => {
            const totalAmount =
              (selectedCounts[product.id] || product.count) * product.price;

            return (
              <div key={product.id} className="product_cart">
                <p>{product?.title}</p>
                <p>{product?.description}</p>
                <p>{product?.price}</p>
                <select
                  value={selectedCounts[product.id] || product.count}
                  onChange={(e) => handleSelectChange(e, product.id)}
                >
                  {Array.from(
                    { length: product.count },
                    (_, index) => index + 1
                  ).map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
                <p>Total: {totalAmount}</p>
                <div>
                <CiCircleRemove
                  onClick={() => handleRemoveProduct(product.id)}
                />
                <button onClick={() => handleOpenCheckout(product.id)}>
                  Checkout
                </button>
                </div>
       
              </div>
            );
          })
        ) : (
          <div>CART IS EMPTY</div>
        )}
      </div>
      {openCheckOut && <Checkout handleCloseCheckOut={handleCloseCheckOut} />}
    </div>
  );
};
