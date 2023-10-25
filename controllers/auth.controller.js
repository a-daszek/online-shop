function getSignup(req,res){
    //...
}

function getLogin(req,res){
    //...
}

module.exports = {
    getSignup: getSignup, //no parentheses, we just point at this function. Additionaly, what we did with this module.exports is we made the function available outside of this file as well
    getLogin: getLogin
};

