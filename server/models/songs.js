const mongoose = require("mongoose");
const songSchema = mongoose.Schema(
  {
    name: {
      Type: String,
      required: true,
    },
    artist: {
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
      requried: true,
    },
    language: {
      type: String,
      required: true,
    },

    instagram: {
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
