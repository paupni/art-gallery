const { Schema, model } = require("mongoose");

const artworkSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["painting", "sculpture", "video", "unclassyfied"],
      message: "Value is not supported",
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "Artist" },
    thumb: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Artwork", artworkSchema);
