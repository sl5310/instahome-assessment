import TYPES from '../commons/Types';
import {inject, injectable} from 'inversify';
import IPromotionService from "./interfaces/IPromotionService";
import IPromotionRepository from "../repositories/interfaces/IPromotionRepository";
import ICheckout from "../entities/interfaces/ICheckout";
import {filter, find, map, keyBy, round, sumBy} from 'lodash';

@injectable()
export default class PromotionService implements IPromotionService {
    private readonly promotionRepository: IPromotionRepository;

    constructor(@inject(TYPES.PromotionRepository) promotionRepository: IPromotionRepository
    ) {
        this.promotionRepository = promotionRepository;
    }

    async calculate(checkout: ICheckout): Promise<ICheckout> {
        let eligiblePromotions = await this.promotionRepository.getActiveListing();
        if (eligiblePromotions.length <= 0) {
            return checkout;
        }

        // filter non eligible promotions
        let discountedValue = sumBy(map(eligiblePromotions, (promotion) => {
            let valid = true;
            let eligibleProducts = keyBy(checkout.products, 'code');

            // check customer limitation
            if (promotion.limit_to_customer && promotion.limit_to_customer.length >= 1) {
                valid = promotion.limit_to_customer.includes(checkout.customer.code);
            }

            // check product limitation
            if (valid && promotion.limit_to_product && promotion.limit_to_product.length >= 1) {
                eligibleProducts = filter(eligibleProducts, (product) => promotion.limit_to_product.includes(product.code));
                valid = eligibleProducts.length >= 1;
            }

            // check minimum_quantity
            if (valid && promotion.minimum_quantity >= 1) {
                const sumQuantity = sumBy(eligibleProducts, 'quantity');
                valid = sumQuantity >= promotion.minimum_quantity;
            }

            if (valid && promotion.discount_unit) {
                switch (promotion.discount_unit) {
                    case 'fixed_quantity': {
                        if (promotion.discount_target_product) {
                            let divide = promotion.minimum_quantity;
                            let discountQty = sumBy(eligibleProducts, 'quantity');
                            // product sum qty >= maximum quantity, make sum qty = maximum_quantity
                            if (promotion.maximum_quantity && discountQty >= promotion.maximum_quantity) {
                                discountQty = promotion.maximum_quantity;
                            }

                            if (!promotion.minimum_quantity || promotion.minimum_quantity <= 0) {
                                divide = 1;
                            }
                            discountQty = Math.floor(discountQty / divide);
                            const discountTarget = find(eligibleProducts, {code: promotion.discount_target_product});
                            return round(discountQty * discountTarget.price, 2);
                        }
                        break;
                    }

                    case 'fixed_product_price': {
                        let discountQty, sumPrice;
                        const discountTarget = find(eligibleProducts, {code: promotion.discount_target_product});

                        if (discountTarget) {
                            discountQty = discountTarget.quantity;
                            sumPrice = round(discountTarget.quantity * discountTarget.price, 2);
                        } else {
                            discountQty = sumBy(eligibleProducts, 'quantity');
                            sumPrice = sumBy(eligibleProducts, (p) => round(p.quantity * p.price, 2));
                        }

                        // product sum qty >= maximum quantity, make sum qty = maximum_quantity
                        if (promotion.maximum_quantity && discountQty >= promotion.maximum_quantity) {
                            discountQty = promotion.maximum_quantity;
                        }

                        return sumPrice - (round(discountQty * promotion.discount_value, 2));
                    }
                }
            }

            return 0;
        }));

        // no eligible promotions
        if (discountedValue <= 0) {
            return checkout;
        }

        checkout.total_price = checkout.total_price - discountedValue;
        return checkout;
    }
}
