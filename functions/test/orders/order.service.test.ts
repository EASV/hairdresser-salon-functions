import {OrderService} from '../../src/orders/order.service';
import {IMock, Times} from 'moq.ts';
import {OrderRepository} from '../../src/orders/order.repository';
import {RepositoryTestHelper} from '../helpers/repository.test.helper';
import {StockRepository} from '../../src/stock/stock.repository';
import {DataTestHelper} from '../helpers/data.test.helper';

describe('OrderService', () => {
  let dataTestHelper: DataTestHelper;
  let repositoryTestHelper: RepositoryTestHelper;
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;
  beforeEach(() => {
    dataTestHelper = new DataTestHelper();
    repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
    orderRepository = repositoryTestHelper.getOrderRepositoryMock();
    stockRepository = repositoryTestHelper.getStockRepositoryMock();
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
  });

  it('OrderService needs a orderRepository and a stockRepository', () => {
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
    expect(orderService).toBeDefined()
  });

  it('When Executing order I need atleast 1 orderline', () => {
    dataTestHelper.order1.orderLines = [];
    //expect(() => {orderService.executeOrder(dataTestHelper.order1)}).toThrow(TypeError);
    //expect(() => {orderService.executeOrder(dataTestHelper.order1)}).toThrow('You need orderlines to execute a order');
  });

  it('When I execute a order stockrepo should be called with the correct amount of products bought with a orderline count of 1', async () => {
    const order = dataTestHelper.order1;
    await orderService.executeOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount),
       Times.Exactly(1));
  });

  it('When I execute a order stockrepo should go down with the correct amount pr product bought with a array of orderlines', async () => {
    const order = dataTestHelper.order2;
    const orderLines = order.orderLines;
    await orderService.executeOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStocks(orderLines),
      Times.Exactly(1))
   ;
  });
});
