import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

import React, { useContext } from "react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { item, addItem, removeItem, backendUrl } = useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={backendUrl + "/images/" + image} />
        {!item[id] ? (
          <img
            className="add"
            onClick={() => addItem(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeItem(id)} src={assets.remove_icon_red} />
            <p>{item[id]}</p>
            <img onClick={() => addItem(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} />
        </div>
        <div>
          <div className="food-item-description">{description}</div>
          <div className="food-item-price">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
