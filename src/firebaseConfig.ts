import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh-adGmZcs5UgNFaK7Tp17uFbl7kve1r8",
  authDomain: "todo-app-a4a28.firebaseapp.com",
  projectId: "todo-app-a4a28",
  storageBucket: "todo-app-a4a28.firebasestorage.app",
  messagingSenderId: "289425575601",
  appId: "1:289425575601:web:b7dc384acd4fbf1f039c90",
  measurementId: "G-0SC5V8BVD9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
