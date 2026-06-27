const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  weather: {
    type: String,
    required: [true],
  },
  imageURL: {
    type: String,
    required: [true],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "link is not Valid",
    },
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    default: [],
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
