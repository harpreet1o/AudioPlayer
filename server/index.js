const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();
// use to protect against cors policy
app.use(cors({ orgin: true }));
app.use(express.json());
//connected database
mongoose
  .connect(
    `mongodb+srv://harpreetsinghthechamp:${process.env.MONGODB_PASSWORD}@cluster0.qajvqm2.mongodb.net/`
  )
  .then(() => console.log("connected"));

app.get("/", (req, res) => res.json("hi there"));

//user Authentication route
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

//Artist Routes
const artistRoute = require("./routes/artists");
app.use("/api/artist", artistRoute);
//Album Routes
const album = require("./routes/albums");
app.use("/api/album", album);

//Songs Routes
const songs = require("./routes/songs");
app.use("/api/songs", songs);

app.listen(4000, () => {
  console.log(`listening to the port ${port}`);
});
