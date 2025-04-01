// src/server.js
const express = require("express");
const path = require("path");
const errorMiddleware = require("./middleware/errorMiddleware");
const inventoryRoute = require("./routes/inventoryRoute");
const errorRoute = require("./routes/errorRoute");
const { engine } = require("express-ejs-layouts");

// Set up the app
const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/inv", inventoryRoute);
app.use("/error", errorRoute);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render("error", { message: "Page not found." });
});

// Error Handling Middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
