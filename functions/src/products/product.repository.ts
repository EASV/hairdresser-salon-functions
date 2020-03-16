import {Product} from '../models/product';

export interface ProductRepository {
  set(product: Product): Promise<any>;
  delete(uid: string): Promise<any>;
}
