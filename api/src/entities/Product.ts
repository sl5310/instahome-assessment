import IProduct from "./interfaces/IProduct";

export default class Product implements IProduct {
    code: string;
    name: string;
    description: string;
    price: number;
}
