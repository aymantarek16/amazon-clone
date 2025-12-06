import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error(
    "❌ FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables."
  );
}

// parse JSON
const serviceAccount = JSON.parse(serviceAccountKey);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDB = admin.firestore();

export { adminDB };
