const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

app.get("/", (req, res) => res.json("hi there"));
app.listen(4000, () => {
  console.log(`listening to the port ${port}`);
});
