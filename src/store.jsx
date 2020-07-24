import { createStore,combineReducers,compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Custom Reducers
//@todo

const firebaseConfig = {
    apiKey: "AIzaSyBVmfVbyBVyPPsmqfYaXurhlkvWJp5sQPg",
    authDomain: "reactclientpanel-f5928.firebaseapp.com",
    databaseURL: "https://reactclientpanel-f5928.firebaseio.com",
    projectId: "reactclientpanel-f5928",
    storageBucket: "reactclientpanel-f5928.appspot.com",
    messagingSenderId: "269950131320",
    appId: "1:269950131320:web:193d30554b0ffedcf0a18d",
    measurementId: "G-D0JXGCXP6D"
};

//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

//Initialize firebase instance
firebase.initializeApp(firebaseConfig)

//Initialize firestore
const firestore= firebase.firestore();
const settings = {timestampsInSnapshots:true};
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase)
)(createStore)
  
// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  });

//Create Initial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(rootReducer,initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;