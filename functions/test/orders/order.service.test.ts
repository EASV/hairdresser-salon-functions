import {OrderService} from '../../src/orders/order.service';
import {IMock, Times} from 'moq.ts';
import {OrderRepository} from '../../src/orders/order.repository';
import {TestHelper} from '../helpers/helper';
import {StockRepository} from '../../src/stock/stock.repository';

describe('OrderService', () => {
  let testHelper: TestHelper;
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;
  beforeEach(() => {
    testHelper = new TestHelper();
    orderRepository = testHelper.getOrderRepositoryMock();
    stockRepository = testHelper.getStockRepositoryMock();
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
  });

  it('OrderService needs a orderRepository and a stockRepository', () => {
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
    expect(orderService).toBeDefined()
  });

  it('When Executing order I need atleast 1 orderline', () => {
    const order = testHelper.getOrder1();
    order.orderLines = [];
    expect(() => {orderService.executeOrder(order)}).toThrow(TypeError);
    expect(() => {orderService.executeOrder(order)}).toThrow('You need orderlines to execute a order');
  });

  it('When I execute a order1 stock should go down with the correct amount of products bought with a orderline count of 1', async () => {
    const order = testHelper.getOrder1();
    const orderAfterExecute = await orderService.executeOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount),
       Times.Exactly(1));
    expect(orderAfterExecute).toBeDefined();
  });
});
