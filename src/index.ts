import Publisher from "./publisher";
import { AbstractNotificationService } from "./notification-service-factory";
import Subscriber from "./customer";

let sub1:Subscriber = Subscriber
                        .builder()
                        .setCustId(10)
                        .setFirstName("archit")
                        .setLastName("jain")
                        .setEmail("architjain669@gmail.com")
                        .setGender("Male")
                        .build();



let sub2:Subscriber = Subscriber
                    .builder()
                    .setCustId(10)
                    .setFirstName("rohit")
                    .setLastName("jain")
                    .setEmail("architjain669@gmail.com")
                    .setGender("Male")
                    .build();


const broker = new AbstractNotificationService();

broker.subscribe(10, sub1);
broker.subscribe(10, sub2);


const publisher = new Publisher(10, "hello i am archit", "Qos0");

publisher.publish("hello this is message");




