import Address from "../../src/entity/address";
import Customer from "../../src/entity/customer";

describe('Customer unit test', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it('should change name', () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(() => {
           expect(customer.name).not.toBe("Jane");
        });
    });
    it('should change name', () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(() => {
           expect(customer.name).not.toBe("Jane");
        });
    });
    it('should activate customer', () => {
        const customer = new Customer("123", "John");
        const address =  new Address("Street 1", 123, "12345-678", "City 1");
        customer.address = address;
        expect(customer.isActive).toBe(true);
    });

    it('should deactivate customer', () => {
        const customer = new Customer("123", "John");
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it('should add reward points', () => {
        const customer = new Customer("123", "John");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(20);
        expect(customer.rewardPoints).toBe(30);
    });

    
});