import React, { FC, useEffect, useState } from "react";
import "./productList.css";
import { useAppDispatch } from "../../store";
import { getProducts } from "../../services/requests/products/request";
import { useSelector } from "react-redux";
import {
  CounttSelector,
  productIdSelector,
  productSelector,
  searchTextSelector,
} from "../../store/products/products-selector";
import { ProductDetails } from "../productDetails";
import { setId } from "../../store/products/products-slice";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { productCountSelector } from "../../store/cart/cart-selector";
import { usersSelector } from "../../store/login/login-selector";
import { loginProvider } from "../../providers/login-provider";
import { AddProduct } from "../addProduct";

export const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(productSelector);
  const searchtext = useSelector(searchTextSelector);

  const users = useSelector(usersSelector);

  const userId = loginProvider.getUserId() + "";
  const currentUser = users?.find((user) => user?.id === userId);
  console.log(currentUser, "currentuser");

  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleOpenDescription = (id: string) => {
    setOpenDetails(true);
    dispatch(setId(id));
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const filteredProducts =
    products && Array.isArray(products)
      ? products.filter(
          (product) =>
            product.title?.toLowerCase().includes(searchtext?.toLowerCase()) ||
            (product.price + "").includes(searchtext)
        )
      : [];

  return (
    <>
      <h3 className="products">Products List</h3>
      {currentUser?.role === "superAdmin" && <AddProduct />}
      <div className="products_list">
        {filteredProducts?.map((product: any) => (
          <div
            key={product.id}
            className="product"
            onClick={() => handleOpenDescription(product.id)}
          >
            <h3 className="product_title">{product.title}</h3>
            <br />
            <p>$ {product.price}</p>
            <div className="count_box">
              <MdOutlineProductionQuantityLimits />
              <p>{product.count}</p>
            </div>
          </div>
        ))}
        {openDetails && (
          <ProductDetails handleCloseDetails={handleCloseDetails} />
        )}
      </div>
    </>
  );
};
