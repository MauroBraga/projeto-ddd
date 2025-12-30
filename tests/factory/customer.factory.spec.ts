import CustomerFactory from "../../src/domain/customer/factory/customer.factory";

describe("Customer Factory Test", () => {
    
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customers with address", () => {
        const customer = CustomerFactory.createWithAddress("John Doe"," Street 1", 123, "12345-678", "City");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe(" Street 1");
        expect(customer.address.number).toBe(123);
        expect(customer.address.city).toBe("City");
    });
});