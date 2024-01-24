import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// need to hide them
const firebaseConfig = {
  apiKey: "AIzaSyCLsQo7KGmgVRf-gLQAFSkFmlUXKDWJCu8",
  authDomain: "musicapp-31c58.firebaseapp.com",
  projectId: "musicapp-31c58",
  storageBucket: "musicapp-31c58.appspot.com",
  messagingSenderId: "401842252723",
  appId: "1:401842252723:web:ba09b243e18cb098ebb9c6",
  measurementId: "G-B9ZTVGZM8H",
};

// if the firebase app already exist than it is going to get the app if not the it is going to intialize

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
