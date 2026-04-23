import Address from "../../../../src/domain/customer/value-object/address";
import Customer from "../../../../src/domain/customer/entity/customer";
import FindCustomerUseCase from "../../../../src/usecase/customer/find/find.customer.usecase";

const customer = new Customer("123", "Jonh Doe");
const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
}

describe("Unit Test find customer use case", () => {



    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);


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