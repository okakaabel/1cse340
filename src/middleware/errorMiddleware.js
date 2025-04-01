// src/middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Check the environment and handle error response appropriately
  if (process.env.NODE_ENV === 'production') {
    res.status(500).render("error", {
      message: "Something went wrong! Please try again later."
    });
  } else {
    // In development, send detailed error information
    res.status(500).send({
      message: "Internal Server Error",
      error: err.stack
    });
  }
};

module.exports = errorMiddleware;
