import Address from "../value-object/address.js";

export default class Customer {
    private _id: string;
    private _name: string
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

   changeName(name: string): void {
        this._name = name;
        this.validate()
   }

   changeAddress(address: Address): void {
        this._address = address;
   }    

   activate(): void {
        if (this._address !== undefined) {
            throw new Error("Address is required to activate a customer");
        }
        this._active = true;
   }

   deactivate(): void {
        this._active = false;
   }

   get id(): string {
        return this._id;
   }

   get name(): string {
        return this._name;
   }        
    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }   
    
    get isActive(): boolean {
        return this._active;
    }   

    get active(): boolean {
        return this._active;
    }

    set address(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }
}