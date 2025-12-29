import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../src/infrastructure/order/repository/sequilize/order.model";
import CustomerModel from "../../src/infrastructure/customer/repository/sequilize/customer.model";
import Customer from "../../src/domain/customer/entity/customer";
import OrderItemModel from "../../src/infrastructure/order/repository/sequilize/ordem-item.model";
import ProductModel from "../../src/infrastructure/product/repository/sequilize/product.model";
import Address from "../../src/domain/customer/value-object/address";
import ProductRepository from "../../src/infrastructure/product/repository/sequilize/product.repository";
import Product from "../../src/domain/product/entity/product";
import CustomerRepository from "../../src/infrastructure/customer/repository/sequilize/customer.repository";
import OrderItem from "../../src/domain/checkout/entity/order_item";
import Order from "../../src/domain/checkout/entity/order";
import OrderRepository from  "../../src/infrastructure/order/repository/sequilize/order.repository";

describe('Order Repository Test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

            sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

        await sequelize.sync();

        
    });

    afterAll(async () => {
        await sequelize.close();
    }); 

    it('should create an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product);


        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);

        const order = new Order('123', customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,      
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId,
                    order_id: order.id,
                },
            ],
        });   
     
    });

    it('should find an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product);    
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
        
        const order = new Order('123', customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it('should update an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product);    
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
        
        const order = new Order('123', customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Update order: change quantity of the item
        orderItem.quantity = 5;
        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(updatedOrderModel?.toJSON()).toStrictEqual({
            id: order.id,   
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId,
                    order_id: order.id,
                },
            ],
        });
    });

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'Customer 1'); 
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product);    
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
        
        const order = new Order('123', customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(1);
        expect(orders).toContainEqual(order);   
    });
});