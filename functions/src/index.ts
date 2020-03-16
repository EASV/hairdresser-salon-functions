import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const serviceAccount = require("../secret.json")
const difa = new DependencyFactory()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hairdresser-salon-1d12f.firebaseio.com"
});

exports.productWritten = functions.firestore
  .document('products/{prodId}')
  .onWrite((snap, context) => {
    return difa.getProductController().writtenProducts(snap, context);
  });

exports.topProductUpdated = functions.firestore
  .document('top-products/{prodId}')
  .onUpdate((snap, context) => {
    return difa.getProductController().updatedTopProduct(snap, context)
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
