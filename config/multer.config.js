const multer = require("multer");

const firebasestorage = require("multer-firebase-storage");

const firebase = require("./firebase.config")
const ServiceAccount = require("../drive-528f2-firebase-adminsdk-fbsvc-e3e3d1445f.json")

const storage = firebasestorage({
    credentials: firebase.credential.cert(ServiceAccount),
    bucketName: "drive-528f2.firebasestorage.app",
    unique: true
})

const upload = multer({
    storage:storage
})

module.exports = upload;