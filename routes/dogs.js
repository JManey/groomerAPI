const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");

// index route
router.get("/", async (req, res, next) => {
  try {
    const dogs = await Dog.find({});
    res.send(dogs);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// new form route
router.get("/new", (req, res) => {
  res.send("new dog form");
});

// create route
router.post("/", async (req, res, next) => {
  try {
    const dog = await Dog.create(req.body);
    res.send(dog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// show route
router.get("/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.send(dog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// edit form route
router.get("/:id/edit", (req, res) => {
  res.send("edit dog form");
});

// update form route
router.put("/:id", async (req, res, next) => {
  try {
    await Dog.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/dogs/${req.params.id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//destroy route
router.delete("/:id/delete", async (req, res, next) => {
  try {
    await Dog.findByIdAndRemove(req.params.id);
    res.redirect("/dogs");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
