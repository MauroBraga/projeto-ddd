import { v4 as uuuidv4 } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {
    static create(name: string): Customer {
        const id= uuuidv4();
        return new Customer(id, name);
    }

    static createWithAddress(name: string, street: string, number: number, zip: string, city: string): Customer {
        const id= uuuidv4();
        const customer = new Customer(id, name);
        const adress = new Address(street, number, zip, city);
        customer.changeAddress(adress);
        return customer;
    }   
}