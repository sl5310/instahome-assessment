import ICheckout from "./interfaces/ICheckout";
import ICustomer from "./interfaces/ICustomer";
import IProduct from "./interfaces/IProduct";

export default class Checkout implements ICheckout {
    customer: ICustomer;
    products: IProduct[];
    total_price: number;
}
