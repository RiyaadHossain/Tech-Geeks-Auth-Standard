import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBiM86VvT47NKR3eksx9Btsuv38IRZIT1w",
    authDomain: "tech-geeks-auth-dc167.firebaseapp.com",
    projectId: "tech-geeks-auth-dc167",
    storageBucket: "tech-geeks-auth-dc167.appspot.com",
    messagingSenderId: "468385949996",
    appId: "1:468385949996:web:1951919dab590fabf82489"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth