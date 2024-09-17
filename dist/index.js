"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publisher_1 = __importDefault(require("./publisher"));
const notification_service_factory_1 = require("./notification-service-factory");
const customer_1 = __importDefault(require("./customer"));
let sub1 = customer_1.default
    .builder()
    .setCustId(10)
    .setFirstName("archit")
    .setLastName("jain")
    .setEmail("architjain669@gmail.com")
    .setGender("Male")
    .build();
let sub2 = customer_1.default
    .builder()
    .setCustId(10)
    .setFirstName("rohit")
    .setLastName("jain")
    .setEmail("architjain669@gmail.com")
    .setGender("Male")
    .build();
const broker = new notification_service_factory_1.AbstractNotificationService();
broker.subscribe(10, sub1);
broker.subscribe(10, sub2);
const publisher = new publisher_1.default(10, "hello i am archit", "Qos0");
publisher.publish("hello this is message");
