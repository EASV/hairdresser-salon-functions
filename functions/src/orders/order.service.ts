import {OrderRepository} from './order.repository';
import {StockRepository} from '../stock/stock.repository';
import {Order} from '../models/order';

export class OrderService {
  constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {
    console.log(this.orderRepository);
    console.log(this.stockRepository);
  }


  executeOrder(order: Order): Promise<Order> {
    if(!order.orderLines || order.orderLines.length < 1) {
      throw new TypeError('You need orderlines to execute a order');
    }
    console.log('order', order);
    this.stockRepository.lowerStock(order.orderLines[0].product, order.orderLines[0].amount);
    return Promise.resolve(order);
  }
}
