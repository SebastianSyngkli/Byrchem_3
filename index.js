const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const orderRoutes = require("./routes/order");
const validateRoutes = require("./routes/validate");

app.use("/order", orderRoutes);
app.use("/order", validateRoutes);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
