// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVB49byDIOntGZLjG1gGv8D2vQgEopR2w",
  authDomain: "product-stripe-comments.firebaseapp.com",
  projectId: "product-stripe-comments",
  storageBucket: "product-stripe-comments.appspot.com",
  messagingSenderId: "359816140328",
  appId: "1:359816140328:web:e9f9580f2d3016e0b9471d",
  measurementId: "G-QZCP598L15",
  databaseURL: "https://product-stripe-comments-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
