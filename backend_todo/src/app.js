/**
 * Module dependencies.
 */

const path = require("path");

const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { body, validationResult } = require("express-validator");

const app = express();

//Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

//Helmet protects against various attacks by hackers

app.use(helmet())

//Middleware
const auth = require("./routes/auth/auth.middleware");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for session management
app.use(
  session({
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

//Routes
const todosRouter = require("./routes/todos/todos.routes");
const authRouter = require("./routes/auth/auth.routes");

app.use("/auth", authRouter);

app.use("/todos", todosRouter);


app.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "public"));
});

module.exports = app;
