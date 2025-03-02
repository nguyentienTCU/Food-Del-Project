import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);

export default userRouter;
