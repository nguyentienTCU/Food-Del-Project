import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
import authToken from "../middleware/authToken.js";

const orderRouter = express.Router();

orderRouter.post("/place", authToken, placeOrder);
orderRouter.post("/verify", authToken, verifyOrder);
orderRouter.get("/useroders", authToken, userOrders);
orderRouter.get("/orderslist", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
