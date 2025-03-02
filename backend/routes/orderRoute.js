import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authToken from "../middleware/authToken.js";

const orderRouter = express.Router();

orderRouter.use(authToken);

orderRouter.post("/place", placeOrder);

export default orderRouter;
