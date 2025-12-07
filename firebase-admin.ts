import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";
// If this code is in a tsx/jsx file, you might need to import Buffer if TS doesn't recognize it
import { Buffer } from 'buffer';

// 1. Safely read the Base64 encoded environment variable
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountBase64) {
  throw new Error(
    "❌ FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables."
  );
}

// 2. Decode from Base64 and get the JSON string
// Buffer.from(string, encoding) works well in Node.js environments (like Vercel)
const serviceAccountJsonString = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');

// 3. Parse the JSON string into a JavaScript object
const serviceAccount = JSON.parse(serviceAccountJsonString);

// 4. Initialize Firebase Admin
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// 5. Export the services
export const adminDB = admin.firestore();
