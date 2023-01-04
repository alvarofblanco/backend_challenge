const express = require('express');

const userController = require('../controllers/userController');
const { authenticateToken } = require('../services/userServices');

const userRouter = express.Router();

userRouter.route('/login').post(userController.login);
userRouter.route('/signup').post(userController.signUp);
userRouter.route('/user').get(authenticateToken, userController.userData)

module.exports = userRouter;
