// // // src/firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyBNlWLiiQBLJwJBgLh8BqcCcbynVnPB7k8",
// //   authDomain: "snippet-11be9.firebaseapp.com",
// //   projectId: "snippet-11be9",
// //   storageBucket: "snippet-11be9.firebasestorage.app",
// //   messagingSenderId: "484192534530",
// //   appId: "1:484192534530:web:a3ffa3d365a6d3c5f5e71b",
// //   measurementId: "G-Y84SNGY921"
// // };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const provider = new GoogleAuthProvider();

// // export { auth, provider, signInWithPopup };



// // src/firebase.js

// // Import Firebase core and services
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// // Your combined Firebase configuration (use the one you want)
// const firebaseConfig = {
//   apiKey: "AIzaSyBNlWLiiQBLJwJBgLh8BqcCcbynVnPB7k8",
//   authDomain: "snippet-11be9.firebaseapp.com",
//   projectId: "snippet-11be9",
//   storageBucket: "snippet-11be9.appspot.com", // ← corrected `.app` to `.appspot.com`
//   messagingSenderId: "484192534530",
//   appId: "1:484192534530:web:a3ffa3d365a6d3c5f5e71b",
//   measurementId: "G-Y84SNGY921"
// };
// // const firebaseConfig1 = {
// //   apiKey: "AIzaSyDWQ0iSzVLL0fLvyGRbmXP72ulrpgLS0_A",
// //   authDomain: "snippet-c6355.firebaseapp.com",
// //   projectId: "snippet-c6355",
// //   storageBucket: "snippet-c6355.firebasestorage.app",
// //   messagingSenderId: "218423232356",
// //   appId: "1:218423232356:web:7c23b2df1fd4c188745c71",
// //   measurementId: "G-RVGKBR3TYK"
// // };
// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// // const app1 = initializeApp(firebaseConfig1);

// // Optional: Enable analytics
// const analytics = getAnalytics(app);

// // Firebase Auth
// const auth = getAuth(app);

// // Google and Facebook providers
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// // Export everything you need
// export { auth, googleProvider, facebookProvider, signInWithPopup };




// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNlWLiiQBLJwJBgLh8BqcCcbynVnPB7k8",
  authDomain: "snippet-11be9.firebaseapp.com",
  projectId: "snippet-11be9",
  storageBucket: "snippet-11be9.appspot.com", // ← corrected `.app` to `.appspot.com`
  messagingSenderId: "484192534530",
  appId: "1:484192534530:web:a3ffa3d365a6d3c5f5e71b",
  measurementId: "G-Y84SNGY921"
};
// const facebookProvider = new FacebookAuthProvider();


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');