const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// define a simple route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to our dog groomer  home route" });
});

// login route
//router.post("/login", middleware, callback)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dogs",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

module.exports = router;
