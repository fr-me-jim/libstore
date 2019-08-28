import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// firestore config 
const firebaseConfig = {
    apiKey: "AIzaSyAPm6-jZpaJhgrCHVTugoq5w_rvKToR9dg",
    authDomain: "libstore-45a18.firebaseapp.com",
    databaseURL: "https://libstore-45a18.firebaseio.com",
    projectId: "libstore-45a18",
    storageBucket: "libstore-45a18.appspot.com",
    messagingSenderId: "351366501077",
    appId: "1:351366501077:web:6a9b02c8a5d0de67"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// react-redux config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// create compose enhancer for redux & firebase
const createStoreWithFirebase = compose (
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// initial state
const initialState = { };

// create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;