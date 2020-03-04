const express = require('express');
const authController = require('../../Controllers/authController')

const authRoute = express.Router();


authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);


module.exports = authRoute;