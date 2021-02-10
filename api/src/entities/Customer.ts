import ICustomer from "./interfaces/ICustomer";

export default class Customer implements ICustomer {
    code: string;
    name: string;
}
