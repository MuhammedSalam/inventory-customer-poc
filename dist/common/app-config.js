"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const customer_order_entity_1 = require("../entity/customer-order-entity");
const customer_order_product_1 = require("../entity/customer-order-product");
exports.dbOptions = {
    type: "mssql",
    host: "neusports-dbs.database.windows.net",
    port: 1433,
    username: "adminuser",
    password: "Aug17@12345",
    database: "inventory-customer-db",
    entities: [customer_order_entity_1.CustomerOrder, customer_order_product_1.CustomerOrderProduct],
    synchronize: true,
    options: {
        encrypt: true
    }
};
//# sourceMappingURL=app-config.js.map