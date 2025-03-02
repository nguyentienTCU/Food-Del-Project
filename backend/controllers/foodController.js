import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    let image_filename = req.file.filename;
    const food = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    res.json({ success: true, message: "Successfully Added" });
  } catch (error) {
    res.json({ success: false, error: "Fail to upload" });
    console.log(error.message);
  }
};

const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, error: "Fail to get all food" });
    console.log(error.message);
  }
};

const removeFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFood = await foodModel.findByIdAndDelete(id);
    fs.unlink(`uploads/${deleteFood.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ success: true, message: "Food Removed", remove: deleteFood });
  } catch (error) {
    res.json({ success: false, error: "Fail to delete" });
    console.log(error.message);
  }
};

export { addFood, getAllFood, removeFood };
