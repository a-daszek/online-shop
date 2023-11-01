//npm install csurf

function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken(); //this generates a valid token that is saved in res.locals that will be availale in all of the views later on
    next(); //when executed forwards the request to the next middleware in line
}

module.exports = addCsrfToken;