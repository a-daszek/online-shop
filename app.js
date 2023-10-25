//MVC pattern

const path = require("path"); //this allows us to create a path that will be recognized on all operating systems

const express = require("express");

const authRoutes = require("./routes/auth.routes")// in the package.json we are pointing at this file (with a script) to execute first, and we have to make this file aware of auth.routes (app.js already is in the main project folder, we only have to create a relative path)

const app = express();

app.set("view engine", "ejs");//telling express that we will use ejs package
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));//all the content in the public folder can be requested by visitors

app.use(authRoutes); //we are adiing a middleware that will be trigerred for every incoming request

app.listen(3000);