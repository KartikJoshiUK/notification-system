"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const notification_service_factory_1 = require("./notification-service-factory");
class Topic {
    constructor(topicId, message, mode) {
        this.topicId = topicId;
        this.message = message;
        this.mode = mode;
    }
}
exports.Topic = Topic;
class Publisher extends Topic {
    publish(message) {
        const notificationService = notification_service_factory_1.NotificationServiceFactory.getNotificationService(this.mode);
        notificationService.sendNotification(this.topicId, message);
    }
}
exports.default = Publisher;
