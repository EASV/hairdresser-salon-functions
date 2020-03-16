import {Product} from '../models/product';
import * as admin from 'firebase-admin';

export class ProductRepositoryFirebase {
  topProductsPath = 'top-products';
  set(product: Product): Promise<any> {
    return this.db().doc(`${this.topProductsPath}/${product.uId}`).set(
      product
    );
  };

  delete(uId: string): Promise<any> {
    return this.db().doc(`${this.topProductsPath}/${uId}`).delete();
  };

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}
