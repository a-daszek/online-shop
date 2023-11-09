const Product = require("../models/product.model");

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render("admin/products/all-products", { products: products }); //we are handling products by keyname "products" (the name is up to us) into that template
    } catch (error) {
        next(error);
        return;
    }
}

function getNewProduct(req, res){
    res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next){
    // console.log(req.body);
    // console.log(req.file);
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    try { //express does not handle error that are caused by promises on its own
        await product.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect("/admin/products");
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct
}