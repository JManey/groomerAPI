const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");
const User = require("../models/user");

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

// ==============================
// new form route
// ==============================

// create route
router.post("/", async (req, res, next) => {
  try {
    //find user
    const user = await User.findById(req.user._id);
    //create new dog
    const dog = await Dog.create(req.body);
    //add owner to dog
    dog.owner.username = req.user.username;
    dog.owner.id = req.user._id;
    //save dog
    await dog.save();
    //connect dog to owner
    await user.dogs.push(dog);
    await user.save();
    console.log("user", user);
    console.log("dog", dog);
    res.json(dog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// show route
router.get("/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id)
      .populate("owner")
      .exec()
      .then((dog) => res.json(dog));
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ===========================
// edit form route
// router.get("/:id/edit", (req, res) => {
//   res.json("edit dog form");
// });
// ===========================

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
