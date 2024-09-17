type genderTypes = "Male" | "Female";

class Builder {
    private custId: number = 0;
    private firstName: string = "";
    private middleName?: string = "";
    private lastName: string = "";
    private gender: genderTypes | null = null;
    private email: string = "";

    constructor() {}

    setCustId(id: number) {
        this.custId = id;
        return this;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
        return this;
    }

    setMiddleName(middleName: string) {
        this.middleName = middleName;
        return this;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
        return this;
    }

    setGender(gender: genderTypes) {
        this.gender = gender;
        return this;
    }

    setEmail(email: string) {
        this.email = email;
        return this;
    }

    private validate(): void {
        // Validate required fields
        if (this.custId <= 0) {
            throw new Error("Invalid customer ID. It must be a positive number.");
        }
        if (this.firstName.trim() === "") {
            throw new Error("First name is required.");
        }
        if (this.lastName.trim() === "") {
            throw new Error("Last name is required.");
        }
        if (!["Male", "Female"].includes(this.gender!)) {
            throw new Error("Invalid gender. It must be either 'Male' or 'Female'.");
        }
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.email)) {
            throw new Error("Invalid email format.");
        }
    }

    build() {
        // Perform validation before building
        this.validate();
        return new Subscriber(this);
    }
}

class Customer {
    public custId: number;
    public firstName: string;
    public middleName?: string;
    public lastName: string;
    public gender: genderTypes;
    public email: string;

    constructor(builder: Builder) {
        this.custId = builder['custId'];
        this.firstName = builder['firstName']; 
        this.lastName = builder['lastName'];
        this.gender = builder['gender']!; 
        this.email = builder['email'];
        if (builder['middleName']) {
            this.middleName = builder['middleName']; 
        }
    }

    static builder(): Builder {
        return new Builder();
    }
}


export default class Subscriber extends Customer{
    reciveNotifications(notification: string){
        console.log(`Recieve the notifications ${this.firstName} ${notification}`)
    }
}