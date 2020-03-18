import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Mock, Times} from 'moq.ts';
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

  it('Init Test', async () => {
    console.log('snurf2', product);
    // productRepository.setTopProducts.mockResolvedValue(null);
    // productRepository.setTopProducts.mockRejectedValue(null);
    await productService.writeProducts(
      'abc',
      {uId: 'abc', price: 22, name: 'haircut', timesPurchased: 0, url: 'google.com'},
      {uId: 'abc', price: 22, name: 'haircut2', timesPurchased: 0, url: 'google.com'});
    productRepository.verify(pr => pr.setTopProducts, Times.Exactly(1));
  });

});
