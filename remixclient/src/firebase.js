import firebase from 'firebase';

const config={
    apiKey: "AIzaSyBkKIpT9gZuJYGnEdPZzkCO6WOcl5ZME0w",
    authDomain: "blockpark-ce6fb.firebaseapp.com",
    databaseURL: "https://blockpark-ce6fb.firebaseio.com",
    projectId: "blockpark-ce6fb",
    storageBucket: "blockpark-ce6fb.appspot.com",
    messagingSenderId: "71831579405",
    appId: "1:71831579405:web:386de7294ccb26f2079e44"
}
firebase.initializeApp(config);
export default firebase;
