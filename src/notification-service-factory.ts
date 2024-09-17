import { NotificationMode } from "./types";
import Subscriber from "./customer";

export class AbstractNotificationService{
    static topicToCustomer: Map<number, Set<Subscriber>> = new Map<number, Set<Subscriber>>();
    static customerToTopic: Map<Subscriber, Set<number>> = new Map<Subscriber, Set<number>>();

    constructor(){}

    subscribe(topicId: number , subscriber:Subscriber){
        if (!AbstractNotificationService.topicToCustomer.has(topicId)){
            AbstractNotificationService.topicToCustomer.set(topicId, new Set<Subscriber>());
        }
        AbstractNotificationService.topicToCustomer.get(topicId)?.add(subscriber);
    }

    unsubscribe(topicId:number, subscriber:Subscriber){
        if (AbstractNotificationService.topicToCustomer.has(topicId)){
            AbstractNotificationService.topicToCustomer.get(topicId)?.delete(subscriber);
        }
    }

    protected  sendNotification(topicId:number , message: string): void {
        console.log("notification is sent ...");
    }

}



class Qos0NotificationService extends AbstractNotificationService{

    static instance:Qos0NotificationService;

    private constructor(){
        super();
        if (Qos0NotificationService.instance){
            throw new Error("Instance is already instantitated....")
        }
    }
    
    sendNotification(topicId:number , message: string): void {
        let subscribers = AbstractNotificationService.topicToCustomer.get(topicId);
        if (subscribers != null && subscribers.size > 0){
            for (let subscriber of subscribers){
                subscriber.reciveNotifications(message);
            }
        }
    }

    static getInstance(){
        if (this.instance){
            return this.instance;
        }

        this.instance = new Qos0NotificationService();
        return this.instance;
    }
}

class Qos1NotificationService extends AbstractNotificationService{

    static instance:Qos1NotificationService;

    private constructor(){
        super();
        if (Qos1NotificationService.instance){
            throw new Error("Instance is already instantitated....")
        }
    }

    sendNotification(topicId:number , message: string): void {
        console.log("notification is sent from Qos1 service");
    }

    static getInstance(){
        if (this.instance){
            return this.instance;
        }

        this.instance = new Qos1NotificationService();
        return this.instance;
    }
}



export class NotificationServiceFactory{
    static mode1: NotificationMode = "Qos0";
    static mode2: NotificationMode = "Qos1";

    private constructor(){
        throw new Error("instance of notification service factory is not available...");
    }

    static getNotificationService(modeType: NotificationMode){
        if (modeType == this.mode1){
            return Qos0NotificationService.getInstance();
        }

        return Qos1NotificationService.getInstance();
    }
}