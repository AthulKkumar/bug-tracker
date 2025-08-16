const express = require('express');

const authRouter = require('./v1/auth');

const v1Route = express.Router();

v1Route.get('/v1', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

v1Route.use('/v1/user', authRouter);


module.exports = v1Route;
