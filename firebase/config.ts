import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAfp_oUORONTOZrsG_iIapY0no89HH7pjA",
  authDomain: "library-df7f3.firebaseapp.com",
  projectId: "library-df7f3",
  storageBucket: "library-df7f3.appspot.com",
  messagingSenderId: "842973795304",
  appId: "1:842973795304:web:bf261a6e1d9cff68e58a5d",
  measurementId: "G-W5SPD01GFQ"
};


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}