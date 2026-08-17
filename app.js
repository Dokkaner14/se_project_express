require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const { errors } = require("celebrate");

const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const { createUser, login } = require("./controllers/users");
const { validateUserBody, validateLogin } = require("./middlewares/validation");

const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateLogin, login);

app.use("/users", usersRouter);
app.use("/items", clothingItemsRouter);

const PORT = 3001;

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
