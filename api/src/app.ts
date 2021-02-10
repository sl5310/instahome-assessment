import bodyParser from 'body-parser';
import envConfig from 'dotenv';
import express from 'express';
import cors from 'cors';
import { IController } from './controllers/interfaces/IController';
import COMMONTYPES from './commons/Types';
import container from './inversify.config';
envConfig.config();

export class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(cors());

        this.middleware();
        this.routes();
        const jsonErrorHandler = async (err, req, res, next) => {
            console.log(err);
            res.status(500).send({ error: err.message });
        }
        this.express.use(jsonErrorHandler);
    }


    public middleware() {
        this.express.use(bodyParser.json());
    }

    public routes() {
        const router = express.Router();

        const controllers: IController[] = container.getAll<IController>(COMMONTYPES.Controller);
        controllers.forEach((controller) => controller.register(router));
        this.express.use(router);
    }
}

export default new App().express;
