import { Product } from '../models/product'
import { ProductRepository } from './product.repository'

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    writeProducts(
        prodId: string,
        productBefore: Product,
        productAfter: Product
    ): Promise<void> {
        const times = productBefore.timesPurchased++;
        if (productAfter) {
            return this.productRepository.setTopProducts({
                uId: prodId,
                name: productAfter.name,
                price: productAfter.price,
                url: productAfter.url,
                timesPurchased: times,
            })
        } else {
            return this.productRepository.deleteTopProducts(prodId)
        }
    }

    upateTopProduct(
      prodId: string,
      productBefore: Product,
      productAfter: Product): Promise<void> {
        const name = productAfter.name.toUpperCase();
        return this.productRepository.setTopProducts({
            uId: prodId,
            name: name,
            price: productAfter.price,
            url: productAfter.url,
            timesPurchased: productAfter.timesPurchased,
        });
    }

    buy(product: Product): Product {
        if(product) {
            product.timesPurchased = product.timesPurchased +1;
            return product;
        }
        return undefined as any;
    }
}
