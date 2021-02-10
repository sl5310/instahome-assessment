import TYPES from '../commons/Types';
import {inject, injectable} from 'inversify';
import {ResponseOutput} from "../commons/ResponseOutput";
import ICustomerService from "./interfaces/ICustomerService";
import ICustomerRepository from "../repositories/interfaces/ICustomerRepository";

@injectable()
export default class CustomerService implements ICustomerService {
    private readonly customerRepository: ICustomerRepository;

    constructor(@inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository)
    {
        this.customerRepository = customerRepository;
    }

    async listing(): Promise<ResponseOutput> {
        const listing = await this.customerRepository.getListing();
        return ResponseOutput.createOkResponse(listing);
    }
}
