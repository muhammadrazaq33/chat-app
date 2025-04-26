import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // console.log("Cookies:", req.cookies); // Debugging cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided" });
    }
    // if there is jwt token so we will parse token through cookie-parser package and decode the token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("checkin", decode);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized. Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
