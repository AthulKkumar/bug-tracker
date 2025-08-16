const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: err.message });
};

module.exports = { errorHandler };
