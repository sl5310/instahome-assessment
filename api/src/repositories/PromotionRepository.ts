import { injectable } from 'inversify';
import {map} from 'lodash';
import IPromotionRepository from "./interfaces/IPromotionRepository";
import IPromotion from "../entities/interfaces/IPromotion";
import Promotion from "../entities/Promotion";

@injectable()
export default class PromotionRepository implements IPromotionRepository {

    async getActiveListing(): Promise<IPromotion[]> {
        const listing = [
            {
                id: 1,
                description: 'Gets a “3 for 2” deal on Classic Ads',
                discount_unit: 'fixed_quantity', // fixed_quantity, fixed_product_price
                discount_value: 1,
                discount_target_product: 'classic',
                minimum_quantity: 3,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['classic'],
                limit_to_customer: ['unilever']
            },
            {
                id: 2,
                description: 'Gets a discount on Standout Ads where the price drops to $299.99 per ad',
                discount_unit: 'fixed_product_price',
                discount_value: 299.99,
                discount_target_product: null,
                minimum_quantity: null,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['standout'],
                limit_to_customer: ['apple']
            },
            {
                id: 3,
                description: 'Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad',
                discount_unit: 'fixed_product_price',
                discount_value: 379.99,
                discount_target_product: null,
                minimum_quantity: 4,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['premium'],
                limit_to_customer: ['nike']
            },
            {
                id: 4,
                description: 'Gets a “5 for 4” deal on Classic Ads',
                discount_unit: 'fixed_quantity',
                discount_value: 1,
                discount_target_product: 'classic',
                minimum_quantity: 5,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['classic'],
                limit_to_customer: ['ford']
            },
            {
                id: 5,
                description: 'Gets a discount on Standout Ads where the price drops to $309.99 per ad',
                discount_unit: 'fixed_product_price',
                discount_value: 309.99,
                discount_target_product: null,
                minimum_quantity: 5,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['standout'],
                limit_to_customer: ['ford']
            },
            {
                id: 6,
                description: ' Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad',
                discount_unit: 'fixed_product_price',
                discount_value: 389.99,
                discount_target_product: null,
                minimum_quantity: 3,
                maximum_quantity: null,
                start_datetime: null,
                end_datetime: null,
                limit_to_product: ['premium'],
                limit_to_customer: ['ford']
            },
        ];
        return map(listing, (l) => Object.assign(l, Promotion));
    }
}
