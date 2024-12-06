const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: { type: String, requires: true },
  surname: { type: String, requires: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  artworks: { type: Number, default: 0 },
});

module.exports = model("Artist", artistSchema);
