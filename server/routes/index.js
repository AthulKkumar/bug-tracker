const express = require('express');

const authRouter = require('./v1/auth');
const bugRouter = require('./v1/bugs');
const { protect } = require('../middlewares/authMiddleware');

const v1Route = express.Router();

v1Route.get('/v1', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

v1Route.use('/v1/user', authRouter);
v1Route.use('/v1/bugs', protect, bugRouter);


module.exports = v1Route;
