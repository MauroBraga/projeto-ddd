
class Address {
    private readonly _street: string;
    private readonly _number: number;
    private readonly _zip: string;
    private readonly _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
        Object.freeze(this);
    }

    private validate(): void {
        if (!this._street || this._street.length === 0) throw new Error("Street is required");
        if (!this._number || this._number <= 0) throw new Error("Number is required");
        if (!this._zip || this._zip.length === 0) throw new Error("Zip is required");
        if (!this._city || this._city.length === 0) throw new Error("City is required");
    }

    get street(): string { return this._street; }
    get number(): number { return this._number; }
    get zip(): string { return this._zip; }
    get city(): string { return this._city; }

    toString(): string {
        return `${this._street}, ${this._number} - ${this._zip} ${this._city}`;
    }

    equals(other: Address): boolean {
        return this._street === other._street &&
               this._number === other._number &&
               this._zip === other._zip &&
               this._city === other._city;
    }
}
export default Address;