import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";


export default class CustomerRepository implements CustomerRepositoryInterface {
    async find(id: string): Promise<Customer> {
        try {
            const customerModel =  await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
            if (!customerModel) {
                throw new Error("Customer not found");
            }
            const customer = new Customer(
                customerModel.id,
                customerModel.name,
            );
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipCode,
                customerModel.city
            );
            customer.changeAddress(address);
          
            customer.addRewardPoints(customerModel.rewardPoints);
            return customer;
        } catch (error) {
            throw new Error("Customer not found");
        }
    }
    async findAll(): Promise<Customer[]> {
        
        const customersModel = await CustomerModel.findAll();
        return customersModel.map((customerModel) => {
            const customer = new Customer(
                customerModel.id,
                customerModel.name,
            );
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipCode,
                customerModel.city
            );
            customer.address = address;
            return customer;
        });
    }

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipCode: entity.address.zip,
            city: entity.address.city,
            active: entity.activate,
            rewardPoints: entity.rewardPoints,
        });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipCode: entity.address.zip,
            city: entity.address.city,
            active: entity.activate,
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id,
            }
        });
        return;
    }
}