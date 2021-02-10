import IPromotion from "./interfaces/IPromotion";

export default class Promotion implements IPromotion {
    description: string;
    discount_type: string;
    discount_unit: string;
    discount_value: number;
    end_datetime: string;
    id: number;
    limit_to_customer: string[];
    limit_to_product: string[];
    maximum_quantity: number;
    minimum_quantity: number;
    start_datetime: string;
}
