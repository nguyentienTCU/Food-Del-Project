import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

//login logic
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "Login successfully",
      userToken: token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Fail to login" });
  }
};

//register logic
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "Email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(newUser._id);
    res.json({
      success: true,
      message: "Successfully create new user",
      userToken: token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Fail to register" });
  }
};

export { userLogin, userRegister };
