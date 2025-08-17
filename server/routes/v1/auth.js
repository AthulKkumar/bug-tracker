const express = require('express');

const { registerUser, loginUser, getUserProfile } = require('../../controllers/authController');
const { protect } = require('../../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.get('/', protect, getUserProfile);
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;
