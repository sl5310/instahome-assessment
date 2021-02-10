import {IController} from "./interfaces/IController";
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import 'reflect-metadata';
import {injectable} from "inversify";
import {ResponseOutput} from "../commons/ResponseOutput";
import TYPES from '../commons/Types';
import container from "../inversify.config";
import ICustomerService from "../services/interfaces/ICustomerService";

@injectable()
export default class CustomerController implements IController {

    public register(router: Router): void {
        const path: string = '/api/customer';
        router.get(`${path}`, asyncHandler(this.getListing));
    }

    async getListing(req: Request, res: Response): Promise<void> {
        let response: ResponseOutput;
        const service = container.get<ICustomerService>(TYPES.CustomerService);
        response = await service.listing();
        res.status(response.statusCode).send(response.body);
    }
}
