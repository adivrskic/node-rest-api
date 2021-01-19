require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log errors.
db.on("error", (error) => {
  console.error(error);
});

// Fires one time on the `open` event.
db.once("open", () => {
  console.log("Connected to DB");
});

// Server accepts JSON as a body inside GET/POST request.
app.use(express.json());

const testRouter = require("./routes/test");
app.use("/test", testRouter);

// Listen on port `3000`.
app.listen(3000, () => {
  console.log("Server has started");
});
