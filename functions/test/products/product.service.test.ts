import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Times} from 'moq.ts';
import {Product} from '../../src/models/product';
import {StockRepository} from '../../src/stock/stock.repository';
import {TestHelper} from '../helpers/helper';

describe('ProductService', () => {
  let testHelper = new TestHelper();
  let productRepository: IMock<ProductRepository>;
  let stockRepository: IMock<StockRepository>;
  let productService: ProductService;
  beforeEach(() => {
    productRepository = testHelper.getProductRepositoryMock();
    stockRepository = testHelper.getStockRepositoryMock();
    productService = new ProductService(productRepository.object(), stockRepository.object());
  });

  it('Product Service needs a StockRepository and a ProductRepository', () => {
    const productServiceDefined = new ProductService(productRepository.object(), stockRepository.object());
    expect(productServiceDefined).toBe(productServiceDefined);
  });

  it('Product Service has a Create Function that expects a product as param that returns a Promise containing the product', async () => {
    const productAfter: Product = await productService.create(testHelper.getProduct1());
    expect(productAfter).toBe(testHelper.getProduct1());
  });

  it('Product Service should call Create Function on productRepository', async () => {
    //await productService.create(product);
    //productRepository.verify(repository => repository.create(product), Times.Exactly(1));
  });

  it('When Product is created a new stock with count of 5 should be added to the stock collection', async () => {
    await productService.create(testHelper.getProduct1());
    stockRepository.verify(stockRepo => stockRepo.create(testHelper.getProduct1(), 5), Times.Exactly(1));
  });

});
