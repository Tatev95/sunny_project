import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productSelector,  } from "../../store/products/products-selector";
import { setProducts } from "../../store/products/products-slice";

export const Sort = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelector);

 
  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortkey = e.target.value as "count" | "price";
    setSortValue(sortkey);

    const sortedProductList = [...products].sort((a, b) => {
      return a[sortkey] - b[sortkey];
    }); 

    dispatch(setProducts(sortedProductList));
  };

  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSortChange} value={sortValue}>
        <option value=""></option>
        <option value="count">count</option>
        <option value="price">price</option>
      </select>
    </div>
  );
};
