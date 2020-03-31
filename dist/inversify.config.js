"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_1 = __importDefault(require("./type"));
const customer_repository_1 = require("./repository/customer-repository");
const container = new inversify_1.Container();
container.bind(type_1.default.CustomerRepository).to(customer_repository_1.CustomerRepository).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map