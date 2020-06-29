const mongoose = require("mongoose");

const DogScema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number,
  color: String,
  details: String,
});

module.exports = mongoose.model("Dog", DogScema);
