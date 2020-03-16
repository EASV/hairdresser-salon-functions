import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Mock, Times} from 'moq.ts';
import {Product} from '../../src/models/product';

describe('ProductController', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;
  let product: Product = {url: 'a', timesPurchased: 0, name: 'b', price: 22, uId:'ab'}
  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.set(product))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
  });

  it('Init Test', async () => {
    // productRepository.set.mockResolvedValue(null);
    // productRepository.set.mockRejectedValue(null);
    await productService.write(
      'abc',
      {uId: 'abc', price: 22, name: 'haircut', timesPurchased: 0, url: 'google.com'},
      {uId: 'abc', price: 22, name: 'haircut2', timesPurchased: 0, url: 'google.com'});
    productRepository.verify(pr => pr.set, Times.Exactly(1));
  });

});
