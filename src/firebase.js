import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBId-3RdUNS5ZBTcS6pG-ID00CGrK_WXZU",
  authDomain: "podcast-app-react-1e3fa.firebaseapp.com",
  projectId: "podcast-app-react-1e3fa",
  storageBucket: "podcast-app-react-1e3fa.appspot.com",
  messagingSenderId: "237434302183",
  appId: "1:237434302183:web:660a0536082e0a378e3c42",
  measurementId: "G-GM6870KNR1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
