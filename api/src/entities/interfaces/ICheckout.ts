import IProduct from "./IProduct";
import ICustomer from "./ICustomer";

export default interface ICheckout {
    customer: ICustomer;
    products: IProduct[];
    total_price: number;
}
