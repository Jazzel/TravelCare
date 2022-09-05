const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const mongoose = require("mongoose");

const app = express();
const port = 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
