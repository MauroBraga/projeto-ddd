import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../src/infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../src/infrastructure/repository/product.repository";
import Product from "../../src/domain/entity/product";

describe("Product Repository Test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

         sequelize.addModels([ProductModel]);

        await sequelize.sync();

        
    });
    
    afterEach(async () => {
            await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);
        
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);
        
        product.changeName("Updated Product");
        product.changePrice(150);
        
        await productRepository.update(product);
        
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Updated Product",
            price: 150,
        });
    });

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        
        await productRepository.create(product);        
        const foundProduct = await productRepository.find("1");
        
        expect(foundProduct).toStrictEqual(product);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        
        await productRepository.create(product1);
        await productRepository.create(product2);
        
        const products = await productRepository.findAll();
        
        expect(products).toHaveLength(2);
        expect(products).toContainEqual(product1);
        expect(products).toContainEqual(product2);
    });

});