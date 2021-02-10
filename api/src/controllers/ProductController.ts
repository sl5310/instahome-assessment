import {IController} from "./interfaces/IController";
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import 'reflect-metadata';
import {injectable} from "inversify";
import {ResponseOutput} from "../commons/ResponseOutput";
import IProductService from "../services/interfaces/IProductService";
import TYPES from '../commons/Types';
import container from "../inversify.config";

@injectable()
export default class ProductController implements IController {

    public register(router: Router): void {
        const path: string = '/api/product';
        router.get(`${path}`, asyncHandler(this.getListing));
    }

    async getListing(req: Request, res: Response): Promise<void> {
        let response: ResponseOutput;
        const service = container.get<IProductService>(TYPES.ProductService);
        response = await service.listing();
        res.status(response.statusCode).send(response.body);
    }
}
