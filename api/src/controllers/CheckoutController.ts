import {IController} from "./interfaces/IController";
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import 'reflect-metadata';
import {injectable} from "inversify";
import {ResponseOutput} from "../commons/ResponseOutput";
import TYPES from '../commons/Types';
import container from "../inversify.config";
import ICheckoutService from "../services/interfaces/ICheckoutService";
import {get} from 'lodash';

@injectable()
export default class CheckoutController implements IController {

    public register(router: Router): void {
        const path: string = '/api/checkout';
        router.post(`${path}`, asyncHandler(this.checkout));
    }

    async checkout(req: Request, res: Response): Promise<void> {
        let response: ResponseOutput;
        const service = container.get<ICheckoutService>(TYPES.CheckoutService);
        const data = get(req, 'body');
        response = await service.checkout(data);
        res.status(response.statusCode).send(response.body);
    }
}
