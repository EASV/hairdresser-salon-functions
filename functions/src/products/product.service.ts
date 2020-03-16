import { Product } from '../models/product'
import { ProductRepository } from './product.repository'

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    write(
        prodId: string,
        productBefore: Product,
        productAfter: Product
    ): Promise<void> {
        const times = productBefore.timesPurchased++;
        if (productAfter) {
            return this.productRepository.set({
                uId: prodId,
                name: productAfter.name,
                price: productAfter.price,
                url: productAfter.url,
                timesPurchased: times,
            })
        } else {
            return this.productRepository.delete(prodId)
        }
    }
}
