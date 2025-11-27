import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("🔥 FirebaseAdmin: Loading file...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  console.log("🌍 FirebaseAdmin: Using production ENV variable");

  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("✅ FirebaseAdmin: ENV JSON parsed successfully");
  } catch (e) {
    console.error("❌ ERROR parsing Firebase JSON:", e.message);
  }
} else {
  console.log("💻 FirebaseAdmin: Using local JSON file");

  const filePath = path.join(__dirname, "config/firebase-service-account.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  serviceAccount = JSON.parse(fileData);
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 FirebaseAdmin: Initialized Successfully");
} catch (e) {
  console.error("❌ FirebaseAdmin Init Failed:", e.message);
}

export default admin;
