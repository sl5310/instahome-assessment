import ICheckoutService from "./interfaces/ICheckoutService";
import {ResponseOutput} from "../commons/ResponseOutput";
import {inject, injectable} from "inversify";
import TYPES from "../commons/Types";
import IProductRepository from "../repositories/interfaces/IProductRepository";
import ICustomerRepository from "../repositories/interfaces/ICustomerRepository";
import IPromotionService from "./interfaces/IPromotionService";
import {isEmpty, groupBy, map, head, round, sumBy} from 'lodash';
import IProduct from "../entities/interfaces/IProduct";
import ICustomer from "../entities/interfaces/ICustomer";
import Checkout from "../entities/Checkout";

@injectable()
export default class CheckoutService implements ICheckoutService {
    private readonly productRepository: IProductRepository;
    private readonly customerRepository: ICustomerRepository;
    private readonly promotionService: IPromotionService;

    constructor(@inject(TYPES.ProductRepository) productRepository: IProductRepository,
                @inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository,
                @inject(TYPES.PromotionService) promotionService: IPromotionService
    ) {
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.promotionService = promotionService;
    }

    async checkout(data): Promise<ResponseOutput> {
        if (isEmpty(data)) {
            return ResponseOutput.createBadRequestResponse('DATA_NOT_FOUND');
        }
        if (isEmpty(data.customer)) {
            return ResponseOutput.createBadRequestResponse('CUSTOMER_IS_REQUIRED');
        }
        if (isEmpty(data.products)) {
            return ResponseOutput.createBadRequestResponse('PRODUCT_IS_REQUIRED');
        }

        const customer = await this.customerRepository.getOne(data.customer);
        if (isEmpty(customer)) {
            return ResponseOutput.createBadRequestResponse('CUSTOMER_NOT_FOUND');
        }

        const products = await this.productRepository.getListing({
            code: data.products
        });
        if (isEmpty(products)) {
            return ResponseOutput.createBadRequestResponse('PRODUCTS_NOT_FOUND');
        }
        let cart = this.convertToCheckout(groupBy(data.products), customer, products);
        cart = await this.promotionService.calculate(cart);

        return ResponseOutput.createOkResponse({
            total_price: cart.total_price
        });
    }

    convertToCheckout = (data, customer: ICustomer, products: IProduct[]) => {
        const checkout = new Checkout();
        checkout.customer = customer;
        checkout.products = map(groupBy(products, 'code'), (list) => {
            const product = head(list);
            return {
                ...product,
                quantity: data[product.code].length,
            }
        });
        checkout.total_price = sumBy(checkout.products, (p) => {
            return round(p.quantity * p.price, 2);
        });
        return checkout;
    }
}
