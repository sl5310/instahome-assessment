import IPromotion from "../../entities/interfaces/IPromotion";

export default interface IPromotionRepository {
    getActiveListing(): Promise<IPromotion[]>;
}
