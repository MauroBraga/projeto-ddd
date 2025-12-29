
import {v4 as uuidv4} from 'uuid';
import Order from '../entity/order';
import Customer from '../../customer/entity/customer';
import OrderItem from '../entity/order_item';


export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }   

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Order must have at least one item");
        }
        const order = new Order(uuidv4(), customer.id, items);
        const rewardPoints = order.total() / 2;
        customer.addRewardPoints(rewardPoints);
        return order;
    }
}