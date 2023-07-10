import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
};

// const clientCredentials = {
//   apiKey: "AIzaSyBbJJ6t56FdwwBI2W22QsHmMvji7QE9O7w",
//   authDomain: "trial-f4ddd.firebaseapp.com",
//   projectId: "trial-f4ddd",
//   storageBucket: "trial-f4ddd.appspot.com",
//   messagingSenderId: "483448811835",
//   appId: "1:483448811835:web:5736e0453c1fc1a7a9c71e",
//   measurementId: "G-33J41M578D"
// };

const app = initializeApp(clientCredentials)

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}