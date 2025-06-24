
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDz4fXH0M681-5jC4yBZizj2yJteKZFv9U",
  authDomain: "miniblog-2148c.firebaseapp.com",
  projectId: "miniblog-2148c",
  storageBucket: "miniblog-2148c.firebasestorage.app",
  messagingSenderId: "253447542009",
  appId: "1:253447542009:web:6148794ccb2e39c55f7e28"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };