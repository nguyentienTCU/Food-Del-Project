import express from "express";
import {
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
import authToken from "../middleware/authToken.js";

const orderRouter = express.Router();

orderRouter.use(authToken);

orderRouter.post("/place", placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/useroders", userOrders);

export default orderRouter;
