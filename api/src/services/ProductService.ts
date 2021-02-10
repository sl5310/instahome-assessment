import IProductService from "./interfaces/IProductService";
import IProductRepository from "../repositories/interfaces/IProductRepository";
import TYPES from '../commons/Types';
import {inject, injectable} from 'inversify';
import {ResponseOutput} from "../commons/ResponseOutput";

@injectable()
export default class ProductService implements IProductService {
    private readonly productRepository: IProductRepository;

    constructor(@inject(TYPES.ProductRepository) productRepository: IProductRepository
    ) {
        this.productRepository = productRepository;
    }

    async listing(): Promise<ResponseOutput> {
        const listing = await this.productRepository.getListing();
        return ResponseOutput.createOkResponse(listing);
    }
}
