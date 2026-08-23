

import express from 'express';
import userController from '../Controller/userController.js';

const userRout = express.Router();

userRout.post('/register', userController.registerUser);
userRout.post('/login', userController.LoggingUser);
userRout.post('/admin', userController.AdminLogin);


export default userRout;