import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [item, setItem] = useState({});
  const backendUrl = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addItem = async (itemId) => {
    if (!item[itemId]) {
      setItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeItem = async (itemId) => {
    setItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.delete(backendUrl + "/api/cart/remove/?itemId=" + itemId, {
        headers: { token },
      });
    }
  };

  const getTotalBill = () => {
    let totalBill = 0;
    for (const eachItem in item) {
      if (item[eachItem] > 0) {
        let itemInfo = food_list.find((product) => eachItem === product._id);
        totalBill += itemInfo.price * item[eachItem];
      }
    }
    return totalBill;
  };

  const fetchFood = async () => {
    const response = await axios.get(backendUrl + "/api/food/foodList");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(backendUrl + "/api/cart/get", {
      headers: { token },
    });
    setItem(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    item,
    addItem,
    removeItem,
    getTotalBill,
    backendUrl,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
