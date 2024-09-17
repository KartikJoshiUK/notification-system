"use strict";
class AbstractNotification {
    constructor() {
        this.topicToCustomer = new Map();
        this.customerToTopic = new Map();
    }
}
