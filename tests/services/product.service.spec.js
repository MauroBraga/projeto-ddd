import Product from "../../src/domain/product/entity/product";
import ProductService from "../../src/domain/product/service/product.service";

describe("Product service unit test", () => {
    it("should change the prices of all products", () => {
        const product1 = new Product("p1", "Product 1", 100);
        const product2 = new Product("p2", "Product 2", 200);
        const products = [product1, product2];  

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
    });
});