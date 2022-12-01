import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxTXYUrjkNBTCWg0mFns76B5fxot81AGg",
  authDomain: "eren-chat.firebaseapp.com",
  projectId: "eren-chat",
  storageBucket: "eren-chat.appspot.com",
  messagingSenderId: "210461025995",
  appId: "1:210461025995:web:0587f93ad76084f0ec9d4e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
