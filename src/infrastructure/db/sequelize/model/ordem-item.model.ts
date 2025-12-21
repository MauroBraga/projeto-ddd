import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import type OrderModel from "./order.model";


@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model{
    @PrimaryKey
    @Column
    declare    id: string;

    @ForeignKey(() => ProductModel)
    @Column
    declare    product_id: string;

    @BelongsTo(() => ProductModel)
    declare   product: ProductModel;

    

    @ForeignKey(() => require("./order.model").default)
    @Column
    declare    order_id: string;

    @BelongsTo(() => require("./order.model").default)
    declare   order: OrderModel;


    @Column({ allowNull: false})
    declare    name: string;

    @Column({allowNull: false})
    declare    price: number;

    @Column({allowNull: false})
    declare    quantity: number;
}