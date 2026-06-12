const Firebase = require("firebase-admin");

const ServiceAccount = require("../drive-528f2-firebase-adminsdk-fbsvc-e3e3d1445f.json")

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(ServiceAccount),
    storageBucket: "drive-528f2.firebasestorage.app"
})

module.exports = Firebase;

// this all is for connecting firebase using the key tht we generated on there