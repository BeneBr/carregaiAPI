const express = require('express');
const userController = require('../../Controllers/userController')
const authMiddleWare = require('../../MiddleWares/auth');

const userRoute = express.Router();


userRoute.use(authMiddleWare);

userRoute.post('/user/image', userController.updateImage);
userRoute.get('/users', userController.getUsers);


module.exports = userRoute;