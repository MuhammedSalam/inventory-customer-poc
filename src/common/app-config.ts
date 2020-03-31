import "reflect-metadata";
import { ConnectionOptions } from "typeorm";

export let dbOptions: ConnectionOptions = {
    type: "mssql",
    host: "neusports-dbs.database.windows.net",
    port: 1433,
    username: "adminuser",
    password: "Aug17@12345",
    database: "inventory-db",
    entities: [],
    synchronize: true,
    options: {
        encrypt: true
    }
}