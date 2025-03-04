import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = () => {
  const backendURL = "http://localhost:4000";
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(backendURL + "/api/order/orderslist");
    if (response.data.success) {
      setAllOrders(response.data.data);
    } else {
      toast.error("Cannot get orders");
    }
  };

  const handleStatus = async (e, orderId) => {
    const response = await axios.post(backendURL + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {allOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon}></img>
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.address}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              className="order-item-select"
              onChange={(e) => handleStatus(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Delivering">Delivering</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
