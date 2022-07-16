import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIRE_APY_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORE_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;