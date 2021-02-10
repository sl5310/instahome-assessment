
const COMMONTYPES = {
    Controller: Symbol.for('Controller'),
    ConnectionManager: Symbol.for('ConnectionManager'),

    CheckoutService: Symbol.for('CheckoutService'),

    ProductService: Symbol.for('ProductService'),
    ProductRepository: Symbol.for('ProductRepository'),

    PromotionService: Symbol.for('PromotionService'),
    PromotionRepository: Symbol.for('PromotionRepository'),

    CustomerService: Symbol.for('CustomerService'),
    CustomerRepository: Symbol.for('CustomerRepository'),
};

export default COMMONTYPES;
