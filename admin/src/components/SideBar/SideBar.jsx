import React from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.add_icon} />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="./orders"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
