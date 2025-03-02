import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalBill, setToken, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  return (
    <div className="navbar">
      <Link onClick={() => setMenu("home")} to="/">
        <img src={assets.logo} className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <HashLink
          smooth
          to="/#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </HashLink>
        <HashLink
          smooth
          to="/#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </HashLink>
        <HashLink
          smooth
          to="/#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </HashLink>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} />
        <div className="navbar-search-icon">
          <Link onClick={() => setMenu("")} to="/cart">
            <img src={assets.basket_icon} />
          </Link>
          <div className={getTotalBill() > 0 ? "dot" : ""}></div>
        </div>
        {loading ? null : !token ? (
          <button onClick={() => setShowLogin(true)}>sign up</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
