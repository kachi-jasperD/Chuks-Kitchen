const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const {connectDB} = require("./db/config/database");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// ----------------------
// Middleware
// ----------------------
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
connectDB();

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/foods", require("./routes/food.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/users", require("./routes/user.routes"));


// Catch-all route for unknown paths
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
