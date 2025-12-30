import ProductInterface from "../entity/product.interface";
import { v4 as uuidv4 } from 'uuid';
import Product from "../entity/product";
import ProductB from "../entity/productb";

export default class ProductFactory {
    static create(type: string, name: string, price: number): ProductInterface {
        switch (type) { 
            case "a":
                return new Product(uuidv4(), name, price);
            case "b":
                // Assuming ProductB is imported correctly
                return new ProductB(uuidv4(), name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}