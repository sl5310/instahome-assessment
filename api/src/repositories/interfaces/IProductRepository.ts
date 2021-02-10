import IProduct from "../../entities/interfaces/IProduct";

export default interface IProductRepository {
    getListing(search?: any): Promise<IProduct[]>;
    getOne(): Promise<IProduct>;
}
