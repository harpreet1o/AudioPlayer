const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");

// use to protect against cors policy
app.use(cors({ orgin: true }));
//connected database
mongoose
  .connect(
    `mongodb+srv://harpreetsinghthechamp:Hmusic@cluster0.qajvqm2.mongodb.net/`
  )
  .then(() => console.log("connected"));

app.get("/", (req, res) => res.json("hi there"));

//user Authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

app.listen(4000, () => {
  console.log(`listening to the port ${port}`);
});
