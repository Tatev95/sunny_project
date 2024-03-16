import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  productIdSelector,
  productSelector,
} from "../../store/products/products-selector";
import "./productDetails.css";
import { useAppDispatch } from "../../store";
import { getProducts } from "../../services/requests/products/request";
import { FaCartArrowDown } from "react-icons/fa";
import { addToCart, getCart } from "../../services/requests/cart/requests";
import { loginProvider } from "../../providers/login-provider";
import { productCountSelector } from "../../store/cart/cart-selector";

interface ProductDetailsProps {
  handleCloseDetails: () => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({
  handleCloseDetails,
}) => {
  const dispatch = useAppDispatch();

  const productId = useSelector(productIdSelector);
  const products = useSelector(productSelector);
  const userId = loginProvider.getUserId() + "";
  const count = useSelector(productCountSelector);


  const currentProduct = products?.find(
    (product: any) => product.id === productId
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, []);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({...currentProduct, userId}));
      handleCloseDetails();
      alert("Product was added to the CART");
      window.location.reload()
    }
  };

  return (
    <div className="detail_wrapper">
      <button className="close_icon" onClick={handleCloseDetails}>
        X
      </button>

      <h3>{currentProduct?.title}</h3>
      <p>{currentProduct?.description}</p>
      <p>${currentProduct?.price}</p>
      <p> {currentProduct?.count}</p>
      <div className="add_to_cart" onClick={handleAddToCart}>
        <h3 className="add"> Add to </h3>
        <FaCartArrowDown />
      </div>
    </div>
  );
};
