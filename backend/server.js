const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connection
require("./models/db");

// routes
app.use("/products", require("./routes/productRoutes"));
app.use("/supplier", require("./routes/supplierRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

// error handler
app.use(require("./middleware/errorHandler"));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});