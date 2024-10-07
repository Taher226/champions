// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDJGya8X3VuMJVVDXFiDKHXxmh6olmmeE',
  authDomain: 'react-native-course-b5a15.firebaseapp.com',
  databaseURL: 'https://react-native-course-b5a15-default-rtdb.firebaseio.com',
  projectId: 'react-native-course-b5a15',
  storageBucket: 'react-native-course-b5a15.appspot.com',
  messagingSenderId: '632363451646',
  appId: '1:632363451646:web:6f69f8d718a96274bf11af',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
