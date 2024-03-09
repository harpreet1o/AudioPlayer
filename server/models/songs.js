const mongoose = require("mongoose");
const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    SongURL: {
      type: String,
      required: true,
    },
    album: String,
    language: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("songs", songSchema);
