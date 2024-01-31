const router = require("express").Router();
const admin = require("../config/firebase");
const user = require("../models/user");

// for the login
// getting the token and validating and decoding it with the help of the admin which is configured in config file and also it has the private key to access it
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "invalid token" });
  }
  //getting the token

  const token = req.headers.authorization;

  //decoding it with our admin auth
  const decodeValue = await admin.auth().verifyIdToken(token);

  if (!decodeValue) {
    return res.status(505).json({ message: "unauthorised" });
  } else {
    // checking user exist or not
    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    console.log(userExists);
    // if not then it is a new user and if not then we update his auth time
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else updateNewUserData(decodeValue, req, res);
  }
});
//creating the new user data
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};
// updating the auth time
const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const option = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      {
        auth_time: decodeValue.auth_time,
      },
      option
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.json({ error: err });
  }
};
module.exports = router;
