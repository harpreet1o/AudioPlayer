var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://musicapp-31c58-default-rtdb.firebaseio.com",
});

module.exports = admin;
