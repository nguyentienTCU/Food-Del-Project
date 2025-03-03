import express from "express";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";
import authToken from "../middleware/authToken.js";

const orderRouter = express.Router();

orderRouter.use(authToken);

orderRouter.post("/place", placeOrder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
