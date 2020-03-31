import express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";

import { createConnection } from "typeorm";
import * as appConfig from "./common/app-config";

import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";
import container from "./inversify.config";

import './controllers/customer.controller';
//const { EventHubClient, delay } = require("@azure/event-hubs");

const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

let connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
let eventHubName = "inventoryeventhub";
let consumerGroup = "$Default"; // name of the default consumer group
let storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=inventoryhubsa;AccountKey=EOYrC4PVUxXq+W9y1LWksFvrK65ifObEANnRcZhX+TTAXkq4gmJp0fNK8D8bwFVuzAqS4AyXjzLWeHm3nWAFPw==;EndpointSuffix=core.windows.net";
let containerName = "inventory-container";
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

main();

createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));


async function main() {
    // Create a blob container client and a blob checkpoint store using the client.
    const containerClient = new ContainerClient(storageConnectionString, containerName);
    const checkpointStore = new BlobCheckpointStore(containerClient);

    // Create a consumer client for the event hub by specifying the checkpoint store.
    const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, checkpointStore);

    // Subscribe to the events, and specify handlers for processing the events and errors.
    const subscription = consumerClient.subscribe({
        
        processEvents: async (events: any, context: any) => {
            for (const event of events) {
                console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
            }
            // Update the checkpoint.
            await context.updateCheckpoint(events[events.length - 1]);
        },

        processError: async (err: any, context: any) => {
            console.log(`Error : ${err}`);
        }
    }
    );

    // After 30 seconds, stop processing.
    await new Promise((resolve) => {
        setTimeout(async () => {
            await subscription.close();
            await consumerClient.close();
            resolve();
        }, 30000);
    });
}

main().catch((err) => {
    console.log("Error occurred: ", err);
});

module.exports = app;