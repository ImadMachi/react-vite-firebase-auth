import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9dW3HXzEEIU0WV5v6WX5yhgHTwHSf4aQ",
  authDomain: "chatapp-34a31.firebaseapp.com",
  projectId: "chatapp-34a31",
  storageBucket: "chatapp-34a31.appspot.com",
  messagingSenderId: "626533778460",
  appId: "1:626533778460:web:43401d3f073ad2b15c4bd9",
  measurementId: "G-MM8E1EPNSM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();
const analytics = getAnalytics(app);

export { auth, storage, db };
