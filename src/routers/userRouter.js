const express = require('express');

const userController = require('../controllers/userController')

const userRouter = express.Router();

userRouter.route('/login').post((req, res) => res.send('LOGIN'));
userRouter.route('/signup').post(userController.signUp)

module.exports = userRouter;
