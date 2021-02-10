import ICustomer from "../../entities/interfaces/ICustomer";

export default interface ICustomerRepository {
    getListing(): Promise<ICustomer[]>;
    getOne(code: string): Promise<ICustomer>;
}
