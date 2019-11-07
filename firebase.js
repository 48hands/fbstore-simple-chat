import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4ObR3c9mim_JSLSS7CtDUbNR5HF2DnGQ',
  authDomain: 'fb-starter-63807.firebaseapp.com',
  databaseURL: 'https://fb-starter-63807.firebaseio.com',
  projectId: 'fb-starter-63807',
  storageBucket: 'fb-starter-63807.appspot.com',
  messagingSenderId: '689756061703',
  appId: '1:689756061703:web:84aebb38d3b385d860aaa2',
  measurementId: 'G-3813E9L18G'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;
