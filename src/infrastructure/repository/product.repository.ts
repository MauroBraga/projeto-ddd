import Product from "../../domain/product/entity/product";
import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface{
    async findByName(name: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async update(entity: Product): Promise<void> {
       await ProductModel.update({
            name: entity.name,
            price: entity.price,
        }, {
            where: {
                id: entity.id,
            }
        });
        return;
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });
        if (!productModel) {
            throw new Error("Product not found");
        }
        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }
    async findAll(): Promise<Product[]> {
        const productsModel = await ProductModel.findAll();
        return productsModel.map((productModel) => {
            return new Product(
                productModel.id,
                productModel.name,
                productModel.price
            );
        });
    }
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    }
}