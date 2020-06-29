const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  notes: String,
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
