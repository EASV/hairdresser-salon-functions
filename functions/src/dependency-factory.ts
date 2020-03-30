import {ProductController} from './products/product.controller';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductService} from './products/product.service';
import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {StockRepository} from './stock/stock.repository';

export class DependencyFactory {
  getProductController(): ProductController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: ProductService = new ProductService(repoProduct, repoStock);
    return new ProductControllerFirebase(service)
  }

}
