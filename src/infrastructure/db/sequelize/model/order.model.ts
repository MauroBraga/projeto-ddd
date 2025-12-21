import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import type CustomerModel from "./customer.model";
import type OrderItemModel from "./ordem-item.model";


@Table({    tableName: "orders",
    timestamps: false,
}) 
export default class OrderModel extends Model{
   
    @PrimaryKey
    @Column
    declare    id: string;

    @ForeignKey(() => require("./customer.model").default)
    @Column
    declare    customer_id: string;

    @BelongsTo(() => require("./customer.model").default)
    declare    customer: CustomerModel;

    @HasMany(() => require("./ordem-item.model").default)
    declare    items: OrderItemModel[];

    @Column({ allowNull: false})
    declare total: number;
    
}