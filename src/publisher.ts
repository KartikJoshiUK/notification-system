import { NotificationServiceFactory } from "./notification-service-factory";

import { NotificationMode } from "./types";

export abstract class Topic{
    constructor(
        public topicId:number,
        public message:string,
        public mode:NotificationMode
    ){

    }
}


export default class Publisher extends Topic{
    publish(message: string ){
        const notificationService = NotificationServiceFactory.getNotificationService(this.mode);
        notificationService.sendNotification( this.topicId, message);
    }
}