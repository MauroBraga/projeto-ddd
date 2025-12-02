import Order from "./order";
import { OrderItem } from "./order_item";


describe('Order unit test', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            // @ts-ignore
            new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it('should throw error customerId is empty', () => {
        expect(() => {
            // @ts-ignore
            new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it('should throw error itens are required', () => {
        expect(() => {
            // @ts-ignore
            new Order("123", "123", []);
        }).toThrow("Items are required");
    });

    it('should calculate total', () => {
        const orderItem1 = new OrderItem("1", "item 1", 100 );
        const orderItem2 = new OrderItem("2", "item 2", 200 );
        const order = new Order("123", "123", [orderItem1, orderItem2]);
        const total = order.total();
        expect(total).toBe(300);
    });

})