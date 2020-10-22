const express = require("express");
const indexRoute = require("./routes/index");
const dogsRoute = require("./routes/dogs");
const usersRoute = require("./routes/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// setup CORS policy so front end can access
const cors = require("cors");

require("dotenv").config();
// connect to the MongoDB with mongoose
require("./config/database");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());
// CORS impement
app.use(cors());

// ============= AUTH SETUP ===============================
// setup express-session
app.use(
  require("express-session")({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===================================================

//awesome middleware adds the username to all routes
//so that templates will have the variable currentUser
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/api", indexRoute);
app.use("/api/dogs", dogsRoute);
app.use("/api/users", usersRoute);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port:", process.env.PORT);
});
