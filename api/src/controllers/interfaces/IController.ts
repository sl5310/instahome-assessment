import { Application, Router } from 'express';

export interface IController {
    register(router: Router): void;
}
