const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number,
  color: String,
  details: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Dog", DogSchema);
