import express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { environment } from './environments/environment';

import { createConnection } from "typeorm";
import * as appConfig from "./common/app-config";

import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";
import container from "./inversify.config";

import './controllers/customer.controller';
var azure = require('azure');
var helpers = require("./controllers/helpers/customer-order");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let server = new InversifyExpressServer(container, null, { rootPath: "/api" }, app);

let appConfigured = server.build();


appConfigured.set("port", process.env.PORT || 8090)

appConfigured.listen(appConfigured.get("port"), () => {

    console.log(("  App is running at http://localhost:%d in %s mode"), appConfigured.get("port"), appConfigured.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

let orderId = setInterval(() => subscribeOrder(), 2000);
let queueName = environment.QueueName;
let connectionString = environment.ServiceBusConnString;

createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to DB: " + appConfig.dbOptions.database);
}).catch(error => console.log("TypeORM connection error: ", error));


function subscribeOrder() {
    var serviceBusService = azure.createServiceBusService(connectionString);
    serviceBusService.receiveQueueMessage(queueName, { isPeekLock: true }, function (error: any, lockedMessage: any) {
        if (!error) {
            console.log('message Received from ' + queueName);
            helpers.saveCustomerOrder(lockedMessage.body);
            helpers.saveCustomerOrderProduct(lockedMessage.body);
            serviceBusService.deleteMessage(lockedMessage, function (deleteError: any) {

                if (!deleteError) {

                    console.log("Message deleted");

                }
            });
        }
    });

}
module.exports = app;