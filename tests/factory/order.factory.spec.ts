import { v4 as uuidV4 } from "uuid";
import OrderFactory from "../../src/domain/checkout/factory/order.factory";

describe("Order Factory Test", () => {
    it("should create an order", () => {
       const orderProps =  {
                id: uuidV4(),
                custormerId: uuidV4(),
                items: [{id: uuidV4(), name: "Product 1", price: 100, productId: "123", quantity: 2}],
            };
        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.custormerId);
        expect(order.items.length).toBe(1);
        expect(order.items[0].id).toBe(orderProps.items[0].id);
        expect(order.items[0].name).toBe(orderProps.items[0].name);
        expect(order.items[0].price).toBe(orderProps.items[0].price);
        expect(order.items[0].productId).toBe(orderProps.items[0].productId);
        expect(order.items[0].quantity).toBe(orderProps.items[0].quantity);


    });
});