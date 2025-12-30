import ProductFactory from "../../src/domain/product/factory/product.factory";

describe("Product Factory Test", () => {
    
    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Product A", 1);
        
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type b", () => {
        const product = ProductFactory.create("b", "Product B", 2);
        
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error for unsupported product type", () => {    
        expect(() => {
            ProductFactory.create("c", "Product C", 3);
        }).toThrowError("Product type not supported");
    });
});