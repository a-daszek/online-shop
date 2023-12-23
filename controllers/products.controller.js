const Product = require("../models/product.model");

async function getAllProducts (req, res, next){
    try {
        const products = await Product.findAll(); //those products are the second ones a line below
        res.render("customer/products/all-products", { products: products });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts: getAllProducts,
};