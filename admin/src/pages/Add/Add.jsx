import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const backendUrl = "http://localhost:4000";
  const onChangeHandle = (e) => {
    const dataName = e.target.name;
    const dataValue = e.target.value;
    setData((prevData) => ({ ...prevData, [dataName]: dataValue }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image);
    const response = await axios.post(`${backendUrl}/api/food/add`, formData);
    if (response.data.success) {
      console.log(response.data);
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandle}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            ></img>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandle}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandle}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              value={data.category}
              onChange={onChangeHandle}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandle}
              value={data.price}
              type="number"
              name="price"
              placeholder="$"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
