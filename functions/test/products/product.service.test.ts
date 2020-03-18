import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Mock} from 'moq.ts';
import {Product} from '../../src/models/product';

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;
  let product: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, uId:'ab'}
  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.setTopProducts(product))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
  });

  it('Buying a product adds one to timesPurchased', async () => {
    const beforePurchased = product.timesPurchased;
    expect(beforePurchased).toBe(0);
    const productAfter: Product = productService.buy(product);
    const afterPurchased = productAfter.timesPurchased;
    expect(afterPurchased).toBe(1);
  });

  it('Buying a product with undefined value should not throw an exception', async () => {
    const productAfter: Product = productService.buy(undefined as any);
    expect(productAfter).toBeUndefined();
  });

});
