const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: [true],
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: [true],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "link is not Valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
});

module.exports = mongoose.model("clothingItem", clothingItem);
