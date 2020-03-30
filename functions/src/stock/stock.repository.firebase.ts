import * as admin from 'firebase-admin';
import {StockRepository} from './stock.repository';
import {Stock} from '../models/stock';
import {Product} from '../models/product';

export class StockRepositoryFirebase implements StockRepository {
  stockPath = 'stocks';

  async create(product: Product, number: number): Promise<Stock> {
    const stock: Stock = {product: product, count: number};
    await this.db().collection(`${this.stockPath}`).add(stock);
    return Promise.resolve(stock);
  }


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
