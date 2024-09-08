const admin = require('firebase-admin');
const serviceAccount = require('./shop-firebase-adminsdk.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}.appspot.com`,
});

const bucket = admin.storage().bucket();

module.exports = bucket;
