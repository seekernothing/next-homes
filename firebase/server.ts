import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getApps, ServiceAccount } from "firebase-admin/app";
import admin  from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";


const serviceAccount = {
  type: "service_account",
  project_id: "next-homes-99ccb",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40next-homes-99ccb.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};


let firestore: Firestore | undefined;
let auth : Auth

const currentApps = getApps();

if(!currentApps.length){
    const app = admin.initializeApp({
        credential:admin.credential.cert(serviceAccount as ServiceAccount)
    })
   firestore = getFirestore(app)
   auth = getAuth(app)
   
}else{

const app = currentApps[0]
  firestore = getFirestore(app);
   auth = getAuth(app);
}


export { firestore,auth };