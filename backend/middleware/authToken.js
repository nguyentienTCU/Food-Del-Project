import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authToken;
