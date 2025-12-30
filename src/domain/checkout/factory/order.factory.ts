import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderItemProps {
    id: string;
    custormerId: string;
    items: {id: string, name: string, price: number, productId: string, quantity: number}[];    
}

export default  class OrderFactory {
    static create(orderProps: OrderItemProps): Order {

        const items = orderProps.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity
            );
        });

        return new Order(
            orderProps.id,
            orderProps.custormerId,
            items
        );
    }
}