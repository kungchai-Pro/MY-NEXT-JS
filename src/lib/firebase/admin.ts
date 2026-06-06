import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const apps = getApps();
  if (apps.length > 0) return apps[0]!;

  const encoded = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;
  if (!encoded) {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_ACCOUNT is not set. " +
        "Encode your service account JSON with: base64 -i serviceAccount.json | tr -d '\\n'"
    );
  }

  const serviceAccount = JSON.parse(
    Buffer.from(encoded, "base64").toString("utf-8")
  ) as Parameters<typeof cert>[0];

  return initializeApp({ credential: cert(serviceAccount) });
}

export const adminDb = getFirestore(getAdminApp());
