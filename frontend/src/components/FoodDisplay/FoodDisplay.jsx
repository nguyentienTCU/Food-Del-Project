import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, search, showSearch } = useContext(StoreContext);

  const filteredList = food_list.filter((item) => {
    if (showSearch) {
      const matchesCategory = category === "" || category === item.category;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }
    return item;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
