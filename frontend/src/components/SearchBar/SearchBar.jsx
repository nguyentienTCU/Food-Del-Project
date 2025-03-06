import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./SearchBar.css";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(StoreContext);
  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="search-container">
      {showSearch && (
        <div className="search-bar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <img className="search-icon" src={assets.search_icon} />
          <div
            className="close-btn"
            onClick={() => {
              setShowSearch(false), setSearch("");
            }}
          >
            <img src={assets.cross_icon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
