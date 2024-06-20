import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaIjLHj0GhX97Oy7bPw7ZJrZk-DNs2hRs",
  authDomain: "eventcraft-e4bba.firebaseapp.com",
  projectId: "eventcraft-e4bba",
  storageBucket: "eventcraft-e4bba",
  messagingSenderId: "89238012731",
  appId: "1:89238012731:web:158554e9befe1a2df32d1e",
  measurementId: "G-QWVK7FCESD"
};

const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { signInWithPopup, auth, provider };
