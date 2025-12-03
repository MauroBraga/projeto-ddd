export class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _productId: string;

    constructor(
        id: string,
        name: string,
        price: number,
        productId: string,
        quantity: number,
    ) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    validate() {
        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
    }

    get id(): string {
        return this._id;
    }



    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }
}