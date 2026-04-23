import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../src/infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../../src/infrastructure/customer/repository/sequilize/customer.repository";
import Address from "../../../../src/domain/customer/value-object/address";
import Customer from "../../../../src/domain/customer/entity/customer";
import FindCustomerUseCase from "../../../../src/usecase/customer/find/find.customer.usecase";

describe("Test find customer use case", () => {

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

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        const customer = new Customer("123", "Jonh Doe");

        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        customer.changeAddress(address)
        await customerRepository.create(customer);

        const input = {
            id: "123",
        };

        const expectedOutput = {
            id: "123",
            name: "Jonh Doe",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zipcode 1",
                city: "City 1",
            },
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);

    });
});