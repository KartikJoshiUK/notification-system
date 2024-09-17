"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Builder {
    constructor() {
        this.custId = 0;
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.gender = null;
        this.email = "";
    }
    setCustId(id) {
        this.custId = id;
        return this;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }
    setMiddleName(middleName) {
        this.middleName = middleName;
        return this;
    }
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    }
    setGender(gender) {
        this.gender = gender;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    validate() {
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
        if (!["Male", "Female"].includes(this.gender)) {
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
    constructor(builder) {
        this.custId = builder['custId'];
        this.firstName = builder['firstName'];
        this.lastName = builder['lastName'];
        this.gender = builder['gender'];
        this.email = builder['email'];
        if (builder['middleName']) {
            this.middleName = builder['middleName'];
        }
    }
    static builder() {
        return new Builder();
    }
}
class Subscriber extends Customer {
    reciveNotifications(notification) {
        console.log(`Recieve the notifications ${this.firstName} ${notification}`);
    }
}
exports.default = Subscriber;
