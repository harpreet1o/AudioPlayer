//creating the user schema
const mongooose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    email_verified: {
      type: Boolean,
      requrired: true,
    },
    role: {
      type: String,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongooose.model("user", UserSchema);
