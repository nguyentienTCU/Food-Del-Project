import express from "express";
import multer from "multer";
import {
  addFood,
  getAllFood,
  removeFood,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/foodList", getAllFood);

foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;
