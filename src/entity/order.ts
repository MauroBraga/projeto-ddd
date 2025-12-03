import type { OrderItem } from "./order_item.js";

class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number = 0;

    constructor(id: string, customerId: string, ordemItems: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = ordemItems;
       this.validate();
       
    }
    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
    validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }   
           
    }

    
}


export default Order;