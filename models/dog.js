const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  weight: Number,
  breed: String,
  sex: String,
  color: String,
  details: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Dog", DogSchema);
