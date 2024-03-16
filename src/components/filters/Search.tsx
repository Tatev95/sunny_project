import React, { ChangeEvent, useEffect, useState } from "react";
import "./filters.css";
import { useAppDispatch } from "../../store";
import { setSearchValue } from "../../store/products/products-slice";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
   const timeOut= setTimeout(() => {
        dispatch(setSearchValue(e.target.value));
    }, 1000);
  };

  return (
    <div>
      <input
        typeof="text"
        placeholder="Search product with title or price"
        className="search_input"
        value={searchText}
        onChange={handleChangeSearchText}
      />
    </div>
  );
};
