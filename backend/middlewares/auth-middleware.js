require("dotenv").config();
const jwt = require("jsonwebtoken");
const loginMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(404).json({
      success: false,
      message: "Token is not found,plz login first and create a token",
    });
    return;
  }

  try {
    const isMatch = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo=isMatch;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid token plz login again and generate a token",
    });
    console.log(error);
  }
};

module.exports = { loginMiddleware };
