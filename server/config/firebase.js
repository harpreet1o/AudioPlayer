const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://musicapp-31c58-default-rtdb.firebaseio.com",
});

module.exports = admin;
