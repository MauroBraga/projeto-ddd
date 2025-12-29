import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../src/infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../src/infrastructure/repository/customer.repository";
import Customer from "../../src/domain/customer/entity/customer";
import Address from "../../src/domain/customer/value-object/address";

describe('customers repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

         sequelize.addModels([CustomerModel]);

        await sequelize.sync();

        
    });
    
    afterEach(async () => {
            await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "12345-678", "City");
        customer.address = address;
        
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
        
        expect(customerModel?.toJSON()).toStrictEqual({  
            id: customerModel?.id,
            name: customerModel?.name,
            street: customerModel?.street,
            number: customerModel?.number,
            zipCode: customerModel?.zipCode,
            city: customerModel?.city,
            active: customerModel?.active,
            rewardPoints: customerModel?.rewardPoints,
        });
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "12345-678", "City");
        customer.address = address;
        
        await customerRepository.create(customer);
        
        const foundCustomer = await customerRepository.find("123");
        
        expect(foundCustomer).toEqual(customer);
    });
        
    it('should find all customers', async () => {   
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "John Doe");
        const address1 = new Address("Street 1", 123, "12345-678", "City");
        customer1.address = address1;
        
        const customer2 = new Customer("456", "Jane Smith");
        const address2 = new Address("Street 2", 456, "98765-432", "Town");
        customer2.address = address2;
        
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        
        const customers = await customerRepository.findAll();
        
        expect(customers).toEqual([customer1, customer2]);
    });

});