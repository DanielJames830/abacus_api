const admin = require('firebase-admin');
require("dotenv").config({ path: '.env' });

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();



module.exports = { db, admin };