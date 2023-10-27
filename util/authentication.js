function createUserSession(req,user,action){
    req.session.uid = user._id.toString(); //user from database with id added by mongodb
    req.session.save(action); //'session' package will execute action once saving the updated session data to the database is done, in other words, 
    //action will only be exxecuted if the session was successfully saved in the store. This action is the anonymous function in auth.controller.js
}

module.exports = {
    createUserSession: createUserSession,
};