"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../entity/order-entity");
let CustomerRepository = class CustomerRepository {
    getOrders() {
        return typeorm_1.getManager().getRepository(order_entity_1.Order).find();
    }
    getOrderDetailsById(orderId) {
        return typeorm_1.getManager().getRepository(order_entity_1.Order).find();
    }
    getInvoiceDetails(orderId) {
        return typeorm_1.getManager().getRepository(order_entity_1.Order).find();
    }
};
CustomerRepository = __decorate([
    inversify_1.injectable()
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer-repository.js.map