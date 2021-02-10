import {IController} from "./interfaces/IController";
import { NextFunction, Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import 'reflect-metadata';
import {injectable} from "inversify";

@injectable()
export default class DiagnosticController implements IController {
    public register(router: Router): void {
        const path: string = '/api/diagnostic';
        router.get(`${path}`, asyncHandler(this.getVersion));
    }

    public async getVersion(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.status(200).send({
            appName: 'instahome-assement',
            appVersion: 1.0,
        });
    }
}
