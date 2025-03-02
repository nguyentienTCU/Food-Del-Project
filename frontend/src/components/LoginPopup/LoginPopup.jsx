import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { backendUrl, setToken } = useContext(StoreContext);
  const [curState, setCurState] = useState("Signup");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandle = (e) => {
    const dataName = e.target.name;
    const dataValue = e.target.value;
    setUserData((prevData) => {
      return { ...prevData, [dataName]: dataValue };
    });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    let newURL = backendUrl;
    if (curState === "Signup") {
      newURL += "/api/user/register";
    } else if (curState === "Login") {
      newURL += "/api/user/login";
    }

    try {
      const response = await axios.post(newURL, userData);
      if (response.data.success) {
        console.log(response.data);
        setToken(response.data.userToken);
        localStorage.setItem("token", response.data.userToken);
        setShowLogin(false);
        setUserData({
          name: "",
          email: "",
          password: "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Cannot " + `${curState}`);
      console.log(error);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandle} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {curState === "Signup" ? (
            <input
              onChange={onChangeHandle}
              value={userData.name}
              name="name"
              type="text"
              placeholder="Enter your Name"
              required
            />
          ) : (
            <></>
          )}
          <input
            onChange={onChangeHandle}
            value={userData.email}
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
          <input
            onChange={onChangeHandle}
            value={userData.password}
            name="password"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">
          {curState === "Signup" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-checking">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Signup" ? (
          <p>
            Already have an account?
            <span onClick={() => setCurState("Login")}> Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span onClick={() => setCurState("Signup")}> Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
