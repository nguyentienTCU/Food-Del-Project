import userModel from "../models/userModel.js";

const addFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const { userId } = req.body;
    const { itemId } = req.query;
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Deleted from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getFood = async (req, res) => {
  try {
    const { userId } = req.body;
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "true" });
  }
};

export { addFood, removeFood, getFood };
