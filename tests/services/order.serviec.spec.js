import OrderItem from "../../src/domain/entity/order_item";
import OrderService from "../../src/domain/services/ordem.service";
import Customer from "../../src/domain/entity/customer";
import Order from "../../src/domain/entity/order";

describe('Order service unit test', () => {

    it("should place an order", () => {

        const customer = new Customer('c1', 'Customer 1');

        const orderItem1 = new OrderItem('oi1', 'p1', 10, 'Product 1',2);
        
        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });

    it('should get total all orders', () => {
        const orderItem1 = new OrderItem('oi1', 'p1', 100, 'Product 1', 2);
        const orderItem2 = new OrderItem('oi2', 'p2', 200, 'Product 2', 1);
        
        const orders = new Order('o1', 'c1', [orderItem1]);
        const orders2 = new Order('o2', 'c2', [orderItem2]);
        const items = [orders, orders2];

        const total = OrderService.total(items);

        expect(total).toBe(400);
    });
});