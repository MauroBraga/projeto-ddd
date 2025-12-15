import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface{
    async findByName(name: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async update(entity: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    }
}