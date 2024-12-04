// Unsuported (404) routes
const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// Middleware to handle Errors
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "An unnown error occured" });
};

module.exports = { notFound, errorHandler };
