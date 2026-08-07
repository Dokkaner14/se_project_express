const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); // ← add this
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

// --- middleware (order matters) ---
app.use(cors());
app.use(express.json());
app.use(requestLogger); // log every incoming request

app.use(auth); // your auth middleware
app.use("/", mainRouter); // routes

app.use(errorLogger); // log errors that reach here
app.use(errors()); // celebrate validation errors
app.use(errorHandler); // your centralized error handler

// --- start server ---
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
