"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServiceFactory = exports.AbstractNotificationService = void 0;
class AbstractNotificationService {
    constructor() { }
    subscribe(topicId, subscriber) {
        var _a;
        if (!AbstractNotificationService.topicToCustomer.has(topicId)) {
            AbstractNotificationService.topicToCustomer.set(topicId, new Set());
        }
        (_a = AbstractNotificationService.topicToCustomer.get(topicId)) === null || _a === void 0 ? void 0 : _a.add(subscriber);
    }
    unsubscribe(topicId, subscriber) {
        var _a;
        if (AbstractNotificationService.topicToCustomer.has(topicId)) {
            (_a = AbstractNotificationService.topicToCustomer.get(topicId)) === null || _a === void 0 ? void 0 : _a.delete(subscriber);
        }
    }
    sendNotification(topicId, message) {
        console.log("notification is sent ...");
    }
}
exports.AbstractNotificationService = AbstractNotificationService;
AbstractNotificationService.topicToCustomer = new Map();
AbstractNotificationService.customerToTopic = new Map();
class Qos0NotificationService extends AbstractNotificationService {
    constructor() {
        super();
        if (Qos0NotificationService.instance) {
            throw new Error("Instance is already instantitated....");
        }
    }
    sendNotification(topicId, message) {
        let subscribers = AbstractNotificationService.topicToCustomer.get(topicId);
        if (subscribers != null && subscribers.size > 0) {
            for (let subscriber of subscribers) {
                subscriber.reciveNotifications(message);
            }
        }
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Qos0NotificationService();
        return this.instance;
    }
}
class Qos1NotificationService extends AbstractNotificationService {
    constructor() {
        super();
        if (Qos1NotificationService.instance) {
            throw new Error("Instance is already instantitated....");
        }
    }
    sendNotification(topicId, message) {
        console.log("notification is sent from Qos1 service");
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Qos1NotificationService();
        return this.instance;
    }
}
class NotificationServiceFactory {
    constructor() {
        throw new Error("instance of notification service factory is not available...");
    }
    static getNotificationService(modeType) {
        if (modeType == this.mode1) {
            return Qos0NotificationService.getInstance();
        }
        return Qos1NotificationService.getInstance();
    }
}
exports.NotificationServiceFactory = NotificationServiceFactory;
NotificationServiceFactory.mode1 = "Qos0";
NotificationServiceFactory.mode2 = "Qos1";
