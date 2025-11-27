import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  // Render / Live
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local - read JSON file manually
  const filePath = path.join(__dirname, "config/firebase-service-account.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  serviceAccount = JSON.parse(fileData);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
