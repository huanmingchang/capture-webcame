import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfqSYoeXJEoiE6rKPS7aIRib1BBXpm37Y',
  authDomain: 'capture-camera-853c1.firebaseapp.com',
  projectId: 'capture-camera-853c1',
  storageBucket: 'capture-camera-853c1.appspot.com',
  messagingSenderId: '5465900333',
  appId: '1:5465900333:web:e486ee6319311871193fa4',
  measurementId: 'G-BR4WHEPN9Q',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
