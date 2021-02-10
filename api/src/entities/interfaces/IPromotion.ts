
export default interface IPromotion {
    id: number;
    description: string;
    discount_type: string;
    discount_unit: string;
    discount_value: number;
    minimum_quantity: number;
    maximum_quantity: number;
    start_datetime: string;
    end_datetime: string;
    limit_to_product: string[];
    limit_to_customer: string[];
}
