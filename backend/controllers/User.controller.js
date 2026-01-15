import bcrypt from "bcryptjs";
import  {User}  from "../models/User.model.js"
import dotenv from "dotenv"

dotenv.config({})

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const Token = await user.generateAccessToken();

    return res.status(200).cookie("Token",Token).json({
        message: "Logged in successfully",
        success: true,
        user: {
          _id: user._id,
          email: user.email,
        },
      });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while logging in user",
      success: false,
      error
    });
  }
};



export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

   
    return res.status(200).json({
        message: "User registered successfully",
        success: true,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error while signing up user",
      success: false,
     });
    }
};

export const fetchCurrentUser = async(req,res) => {
  try {
    const user = req.user;
    // console.log(user)
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while fetching Current user",
      success: false,
      error
     });
  }
}

export const logoutUser = async(req, res) => {
  try {
    return res.clearCookie("Token",{
    httpOnly: true,
    sameSite: "strict",
    secure: "production",
  }).status(200).json({
      message:"user logged out successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during the logout user",
      success: false,
      error
     });
  }
}