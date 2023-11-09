const db = require("../data/database");

class Product {
    constructor(productData){
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; //"+" forces a conversion to number
        this.description = productData.description;
        this.image = productData.image; //the name of the img file
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll() {//with static method we don't need to instantiate the class first, we don't need to create an object based 
        // on the class in order to use static methods
        const products = await db.getDb().collection("products").find().toArray();

        return products.map(function (productDocument) { //transorming an array full of product documents into an array of products objects that are based on our class
            return new Product(productDocument); //we do that to have imagePath and imageUrl
        });
    } 

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };
        await db.getDb().collection("products").insertOne(productData);
    }
}

module.exports = Product;