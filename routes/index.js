const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// define a simple route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to our dog groomer  home route" });
});

// create route ====  sign up new user  =====
router.post("/register", async (req, res, next) => {
  console.log("req.body", req.body);
  let newUser = new User({
    username: req.body.username,
    name: req.body.name,
    notes: req.body.notes,
  });
  User.register(newUser, req.body.password, function (err, user) {
    console.log("newUser", newUser);
    if (err) {
      console.log(err);
      return res.json({ error: "did not register user" });
    }
    passport.authenticate("local")(req, res, () => {
      res.json(user);
    });
  });
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
