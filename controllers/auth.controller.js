const User = require("../models/user.model");
const authUtil = require("../util/authentication");

const validation = require("../util/validation");

function getSignup(req, res) { //renders sign up form
    res.render("customer/auth/signup");
}

async function signup(req, res, next) {  //takes the user data from form
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
        res.redirect("/signup");
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
            res.redirect("/signup");
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
    res.render("customer/auth/login")
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

    if (!existingUser) {
        res.redirect("/login");
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    if (!passwordIsCorrect) {
        res.redirect("/login");
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

