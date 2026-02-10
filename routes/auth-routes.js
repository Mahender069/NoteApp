const express = require("express");
const {registerController,loginController}=require('../controllers/auth-controllers')

const router = express.Router();

router.get('/register',registerController);
router.get('/login',loginController);
module.exports=router;