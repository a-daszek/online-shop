const db = require("../data/database");

const bcrypt = require("bcryptjs");

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email; //with 'this' we are reffering to the to-be-created object
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection("users").findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection("users").insertOne({ //in mongodb we have collections of documents, they are basically like tables in mysql but with no fixed schema and data types
            email: this.email,
            password: hashedPassword, // this.password hashed with - npm install bcryptjs
            name: this.name,
            address: this.address
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;

