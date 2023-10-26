const User = require("../models/user.model");

function getSignup(req,res){ //renders sign up form
    res.render("customer/auth/signup");
}

async function signup(req, res){  //takes the user data from form
    const user = new User(
        req.body.email, 
        req.body.password, 
        req.body.fullname, 
        req.body.street, 
        req.body.postal, 
        req.body.city
    );

    await user.signup(); //stores a new user in a database

    res.redirect("/login");
}

function getLogin(req,res){
    res.render("customer/auth/login")
}

module.exports = {
    getSignup: getSignup, //no parentheses, we just point at this function. Additionaly, what we did with this module.exports is we made the function available outside of this file as well
    getLogin: getLogin,
    signup:signup
};
