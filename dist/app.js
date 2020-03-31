"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appConfig = __importStar(require("./common/app-config"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = __importDefault(require("./inversify.config"));
require("./controllers/customer.controller");
//const { EventHubClient, delay } = require("@azure/event-hubs");
const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
let connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
let eventHubName = "inventoryeventhub";
let consumerGroup = "$Default"; // name of the default consumer group
let storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=inventoryhubsa;AccountKey=EOYrC4PVUxXq+W9y1LWksFvrK65ifObEANnRcZhX+TTAXkq4gmJp0fNK8D8bwFVuzAqS4AyXjzLWeHm3nWAFPw==;EndpointSuffix=core.windows.net";
let containerName = "inventory-container";
const app = express_1.default();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api" }, app);
let appConfigured = server.build();
appConfigured.set("port", process.env.PORT || 8090);
appConfigured.listen(appConfigured.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), appConfigured.get("port"), appConfigured.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
//main();
typeorm_1.createConnection(appConfig.dbOptions).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to DB");
})).catch(error => console.log("TypeORM connection error: ", error));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a blob container client and a blob checkpoint store using the client.
        const containerClient = new ContainerClient(storageConnectionString, containerName);
        const checkpointStore = new BlobCheckpointStore(containerClient);
        // Create a consumer client for the event hub by specifying the checkpoint store.
        // const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, checkpointStore);
        // Subscribe to the events, and specify handlers for processing the events and errors.
        // const subscription = consumerClient.subscribe({
        //     processEvents: async (events: any, context: any) => {
        //         for (const event of events) {
        //             console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
        //         }
        //         // Update the checkpoint.
        //         await context.updateCheckpoint(events[events.length - 1]);
        //     },
        //     processError: async (err: any, context: any) => {
        //         console.log(`Error : ${err}`);
        //     }
        // }
        // );
        // After 30 seconds, stop processing.
        yield new Promise((resolve) => {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                //   await subscription.close();
                //   await consumerClient.close();
                resolve();
            }), 30000);
        });
    });
}
main().catch((err) => {
    console.log("Error occurred: ", err);
});
module.exports = app;
//# sourceMappingURL=app.js.map