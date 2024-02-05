const express = require("express");
const router = express.Router();
const artists = require("../models/artist");

// model for our artist
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });
  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});
router.get("/getOne/:id", async (req, res) => {
  // findone methond which need the parameter first the key and then value
  const filter = { _id: req.params.id };
  const data = await artist.findOne(filter);
  if (data) {
    return res.status(200).res.json({ artist: data, success: "true" });
  } else {
    return res.json({ success: "false" });
  }
});
router.get("/getAll", async (req, res) => {
  // find method is going to give everything then sort is used which is going to sort as per the key in ascending order
  const data = await artist.find().sort({ createdAt: 1 });
  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(404).send({ success: false });
  }
});
router.get("/delete/:id", async (req, res) => {
  const data = await artist.deleteOne({ _id: req.params.id });
  if (data) {
    return res
      .status(200)
      .send({ success: true, artist: data, msg: "the data has been deleted" });
  } else {
    return res.status(404).send({ success: false, msg: "data not found" });
  }
});
router.put("/update/:id", async (req, res) => {
  //find one and update gets three values first is filter and then the values and then the options
  try {
    const data = await artist.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      { upsert: true, new: true }
    );
    return res.send(200).json({ msg: "data updated", success: true });
  } catch (error) {
    return res.send(200).json({ msg: error, success: true });
  }
});
module.exports = router;
