import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/ordem-item.model";


export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
       await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        }, {
            include: [{ model: OrderItemModel}]
        });     
    }
    async update(entity: Order): Promise<void> {
       throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }


    

}