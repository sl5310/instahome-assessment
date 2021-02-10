import ICheckout from "../../entities/interfaces/ICheckout";

export default interface IPromotionService {
    calculate(ICheckout): Promise<ICheckout>;
}
