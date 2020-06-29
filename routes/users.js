const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//all users
// ===== needs to be protected ====
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// show route
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("dogs")
      .exec()
      .then((user) => res.json(user));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// update form route
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/users/${req.params.id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//destroy route
router.delete("/:id/delete", async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect("/users");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
