import express from "express";
import { addFood, removeFood, getFood } from "../controllers/cartController.js";
import authToken from "../middleware/authToken.js";

const cartRouter = express.Router();

cartRouter.use(authToken);

cartRouter.post("/add", addFood);
cartRouter.delete("/remove", removeFood);
cartRouter.get("/get", getFood);

export default cartRouter;
