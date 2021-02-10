import { Container } from 'inversify';

// ### Types ###
import COMMONTYPES from './commons/Types';

// ### Controllers ###
import {IController} from "./controllers/interfaces/IController";
import DiagnosticController from './controllers/DiagnosticController';
import ProductController from './controllers/ProductController';
import CustomerController from "./controllers/CustomerController";
import CheckoutController from "./controllers/CheckoutController";

// ### Services ###
import ICheckoutService from './services/interfaces/ICheckoutService';
import CheckoutService from "./services/CheckoutService";

import IProductService from './services/interfaces/IProductService';
import ProductService from "./services/ProductService";

import ICustomerService from "./services/interfaces/ICustomerService";
import CustomerService from "./services/CustomerService";

import PromotionService from "./services/PromotionService";
import IPromotionService from "./services/interfaces/IPromotionService";

// ### Repository ###
import ICustomerRepository from "./repositories/interfaces/ICustomerRepository";
import CustomerRepository from "./repositories/CustomerRepository";

import IProductRepository from "./repositories/interfaces/IProductRepository";
import ProductRepository from "./repositories/ProductRepository";

import IPromotionRepository from "./repositories/interfaces/IPromotionRepository";
import PromotionRepository from "./repositories/PromotionRepository";

const container = new Container();

// controller bindings
container.bind<IController>(COMMONTYPES.Controller).to(DiagnosticController);
container.bind<IController>(COMMONTYPES.Controller).to(ProductController);
container.bind<IController>(COMMONTYPES.Controller).to(CustomerController);
container.bind<IController>(COMMONTYPES.Controller).to(CheckoutController);

// service bindings
container.bind<IProductService>(COMMONTYPES.ProductService).to(ProductService);
container.bind<ICustomerService>(COMMONTYPES.CustomerService).to(CustomerService);
container.bind<ICheckoutService>(COMMONTYPES.CheckoutService).to(CheckoutService);
container.bind<IPromotionService>(COMMONTYPES.PromotionService).to(PromotionService);

// repository bindings
container.bind<ICustomerRepository>(COMMONTYPES.CustomerRepository).to(CustomerRepository);
container.bind<IProductRepository>(COMMONTYPES.ProductRepository).to(ProductRepository);
container.bind<IPromotionRepository>(COMMONTYPES.PromotionRepository).to(PromotionRepository);

export default container;

