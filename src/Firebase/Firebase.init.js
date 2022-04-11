import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB77uDUjZErr5wvP7pvr5FTI2ddLH8fCxc",
    authDomain: "tech-geeks-resolve.firebaseapp.com",
    projectId: "tech-geeks-resolve",
    storageBucket: "tech-geeks-resolve.appspot.com",
    messagingSenderId: "872543500725",
    appId: "1:872543500725:web:007a195734c9b4e54181fc"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth