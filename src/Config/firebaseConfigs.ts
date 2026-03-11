import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0I51WHAL6qpvxxLwwSG3pTIiXean5Py8",
  authDomain: "devsecops-3ef10.firebaseapp.com",
  projectId: "devsecops-3ef10",
  storageBucket: "devsecops-3ef10.firebasestorage.app",
  messagingSenderId: "316023337330",
  appId: "1:316023337330:web:5b27f6a0fac66854ffadeb",
  measurementId: "G-86NGPRKYLG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
