import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error(
    "❌ FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables."
  );
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n')
);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDB = admin.firestore();
