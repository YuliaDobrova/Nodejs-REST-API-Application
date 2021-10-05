const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
// const usersRouter = require("./routes/api/users");

const { sendResponse } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  sendResponse({ res, status: 404, statusMessage: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  sendResponse({
    res,
    status: status,
    statusMessage: "error",
    data: { message },
  });
});

module.exports = app;
