require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      console.log(user);
      res.status(409).json({
        success: false,
        message: "username or email already registered",
      });
      return;
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User is registered successfully",
        data: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong please try again",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist first register",
      });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    // create access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      success:true,
      message:'user logged in successfully',
      token:accessToken
    })


  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
    console.log(error);
  }
};

module.exports = { registerController, loginController };
