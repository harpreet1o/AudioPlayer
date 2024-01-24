const router = require("express").Router();
const admin = require("../config/firebase");

// for the login
// getting the token and validating and decoding it with the help of the admin which is configured in config file and also it has the private key to access it
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "invalid token" });
  }
  const token = req.headers.authorization.split("")[1];
  const decodeValue = await admin.auth().verifyIdToken(token);
  if (!decodeValue) {
    return res.status(505).json({ message: "unauthorised" });
  } else return res.status(200).json(decodeValue);
});
module.exports = router;
