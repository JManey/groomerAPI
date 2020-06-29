const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// create route
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// show route
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// update form route
router.put("/:id", async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
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
