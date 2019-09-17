import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '@/config/firebase-key';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
