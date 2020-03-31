import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { CustomerOrder } from "../entity/customer-order-entity";
import { Customer } from "../entity/customer-entity";

export let dbOptions: ConnectionOptions = {
    type: "mssql",
    host: "neusports-dbs.database.windows.net",
    port: 1433,
    username: "adminuser",
    password: "Aug17@12345",
    database: "inventory-customer-db",
    entities: [CustomerOrder,Customer],
    synchronize: true,
    options: {
        encrypt: true
    }
}