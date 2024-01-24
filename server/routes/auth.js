const router = require("express").Router();

// for the login
router.get("/login", (req, res) => {
  return res.json("login");
});
module.exports = router;
