import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = () => {
  const backendURL = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${backendURL}/api/food/foodList`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.error);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.delete(
      `${backendURL}/api/food/remove/` + foodId
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${backendURL}/images/` + item.image} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
