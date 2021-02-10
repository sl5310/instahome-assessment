import { injectable } from 'inversify';
import {map, find} from 'lodash';
import ICustomerRepository from "./interfaces/ICustomerRepository";
import Customer from "../entities/Customer";
import ICustomer from "../entities/interfaces/ICustomer";

@injectable()
export default class CustomerRepository implements ICustomerRepository {

    async getListing(): Promise<ICustomer[]> {
        const listing = [
            {
                code: 'default',
                name: 'Default',
            },
            {
                code: 'unilever',
                name: 'Unilever',
            },
            {
                code: 'apple',
                name: 'Apple',
            },
            {
                code: 'nike',
                name: 'Nike',
            },
            {
                code: 'ford',
                name: 'Ford',
            },
        ];
        return map(listing, (l) => Object.assign(l, Customer));
    }


    async getOne(code: string): Promise<ICustomer> {
       const customers = await this.getListing();
        return Object.assign(find(customers, {'code': code}), Customer);
    }
}
