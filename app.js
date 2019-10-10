"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const serveFavicon = require("serve-favicon");

const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const deserializer = require("./middleware/deserializer");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const imageRouter = require("./routes/fileUpload");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, "client/build", "favicon.ico")));
app.use(express.static(join(__dirname, "/client/build")));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

app.use(deserializer);

app.use("/api", authRouter);
app.use("/api", indexRouter);
app.use("/api", imageRouter);

app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "/client/build/index.html"));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  if (req.app.get("env") === "development") console.log(error);
  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
