import { injectable } from 'inversify';
import IProduct from "../entities/interfaces/IProduct";
import IProductRepository from "./interfaces/IProductRepository";
import Product from "../entities/Product";
import {isEmpty, filter, map} from 'lodash';

@injectable()
export default class ProductRepository implements IProductRepository {

    async getListing(search?: any): Promise<IProduct[]> {
        const listing = [
            {
                code: 'classic',
                name: 'Classic Ad',
                description: 'Offers the most basic level of advertisement',
                price: 269.99
            },
            {
                code: 'standout',
                name: 'Standout Ad',
                description: 'Allows advertisers to use a company logo and use a longer presentation text',
                price: 322.99
            },
            {
                code: 'premium',
                name: 'Premium Ad',
                description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
                price: 394.99
            },
        ];

        let products = map(listing, (l) => Object.assign(l, Product));

        if (!isEmpty(search)) {
            if (search.code) {
                if (Array.isArray(search.code)) {
                    products = filter(products, (p) => {
                        return search.code.includes(p.code);
                    });
                } else {
                    products = filter(products, {code: search.code});
                }
            }
        }
        return products;
    }

    async getOne(): Promise<IProduct> {
        return null;
    }
}
