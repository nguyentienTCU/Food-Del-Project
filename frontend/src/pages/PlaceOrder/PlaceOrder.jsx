import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const {
    getTotalBill,
    backendUrl,
    food_list,
    item: cartItem,
    token,
  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const changeHandle = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      items: orderItems,
      amount: getTotalBill() + 2,
      address: data,
    };

    let response = await axios.post(
      backendUrl + "/api/order/place",
      orderData,
      { headers: { token } }
    );
    if (response.data.success) {
      const { sessionURL } = response.data;
      window.location.replace(sessionURL);
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={submitHandle} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={changeHandle}
            name="firstName"
            value={data.firstName}
            required
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={changeHandle}
            name="lastName"
            value={data.lastName}
            required
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          onChange={changeHandle}
          name="email"
          value={data.email}
          required
          type="email"
          placeholder="Email"
        />
        <input
          onChange={changeHandle}
          name="address"
          value={data.address}
          required
          type="text"
          placeholder="Address"
        />
        <div className="multi-fields">
          <input
            onChange={changeHandle}
            name="city"
            value={data.city}
            required
            type="text"
            placeholder="City"
          />
          <input
            onChange={changeHandle}
            name="state"
            value={data.state}
            required
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={changeHandle}
            name="zipcode"
            value={data.zipcode}
            required
            type="text"
            placeholder="Zip code"
          />
          <input
            onChange={changeHandle}
            name="country"
            value={data.country}
            required
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          onChange={changeHandle}
          name="phone"
          value={data.phone}
          required
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub-total</p>
              <p>${getTotalBill()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              Delivery fee
              <p>${getTotalBill() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalBill() === 0 ? 0 : getTotalBill() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
