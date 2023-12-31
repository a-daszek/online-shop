//MVC pattern

const path = require("path"); //this allows us to create a path that will be recognized on all operating systems

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');

const notFoundMiddleware = require("./middlewares/not-found");

const authRoutes = require("./routes/auth.routes");// in the package.json we are pointing at this file (with a script) to execute first, and we have to make this file aware of auth.routes (app.js already is in the main project folder, we only have to create a relative path)

const productsRoutes = require("./routes/products.routes");

const baseRoutes = require("./routes/base.routes");

const adminRoutes = require("./routes/admin.routes");

const cartRoutes = require("./routes/cart.routes");

const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.set("view engine", "ejs");//telling express that we will use ejs package
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));//all the content in the public folder can be requested by visitors

app.use("/products/assets", express.static("product-data"));

app.use(express.urlencoded({ extended: false }));//it should only support regular submission forms hence the false parameter
app.use(express.json());// all incoming request are checked for JSON data

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(csrf()); //package that generates tokens for all requests that are not get request, this will protect the site against csrf attacks 

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes); //we are adding a middleware that will be trigerred for every incoming request
app.use(productsRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", protectRoutesMiddleware, ordersRoutes);

app.use("/admin", protectRoutesMiddleware,adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function () {
    app.listen(3000);
}).catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
});

