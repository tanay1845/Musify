import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const authMiddleware = async(req, res, next) => {
  try {

    const token = req.cookies.Token;
    // console.log(token)+

    if (!token) {
        return res.status(400).json({
          message: "User not authenticated. No token found.",
          success: false,
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded?._id).select("-password")
    // console.log(user)

    req.user = user

    next(); 
  } catch (error) {
    return res.status(401).json({
      message: "Internal server error during authentication.",
      success: false,
      error
    });
  }
};

export default authMiddleware