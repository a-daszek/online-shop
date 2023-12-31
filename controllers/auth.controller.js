const User = require("../models/user.model");
const authUtil = require("../util/authentication");

const validation = require("../util/validation");

const sessionFlash = require("../util/session-flash");

function getSignup(req, res) { //renders sign up form
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData){
        sessionData = {
            email: "",
            password: "",
            confirmEmail: "",
            fullname: "",
            street: "",
            postal: "",
            city: "",

        };
    }

    res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {  //takes the user data from form
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body["confirm-email"],
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    };

    if ( //validation
        !validation.userDetailsAreValid(
            req.body.email,
            req.body.password,
            req.body.fullname,
            req.body.street,
            req.body.postal,
            req.body.city
        ) || !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
    ) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: "Please check your input. Password must be at least 6 characters long and postal code must be 5 characters long.",
            ...enteredData // spread operator will take all the key value pairs and add them a key value in this object, into which you're spreading.
        }, 
        function(){
            res.redirect("/signup");
        })
        return; // just return so no other code executes
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try { // that's how we can handle errors in asynchronous code
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage: "User exists already. Try logging in instead.",
                ...enteredData,
            }, function(){
                res.redirect("/signup");
            });
            return;
        }
        await user.signup(); //stores a new user in a database
    } catch (error) {
        next(error);
        return;
    }

    res.redirect("/login");
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData){
        sessionData = {
            email: "",
            password: "",
        };
    }

    res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res, next) { //see methods in models/user.model.js
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: "Invalid credentials, please check your email and/or password.",
        email: user.email,
        password: user.password
    };

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect("/login");
        })
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    
    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect("/login");
        })
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect("/");
    });

}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect("/login");
}

module.exports = {
    getSignup: getSignup, //no parentheses, we just point at this function. Additionaly, what we did with this module.exports is we made the function available outside of this file as well
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
};

