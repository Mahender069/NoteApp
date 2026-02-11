const User = require("../models/User");
const bcrypt = require("bcrypt");
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
    if (isSame) {
      res.status(200).json({
        success: true,
        message: "User is logged in successfully",
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

module.exports = { registerController, loginController };
