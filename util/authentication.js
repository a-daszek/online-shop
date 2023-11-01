function createUserSession(req,user,action){
    req.session.uid = user._id.toString(); //user from database with id added by mongodb
    req.session.save(action); //'session' package will execute action once saving the updated session data to the database is done, in other words, 
    //action will only be executed if the session was successfully saved in the store. This action is the anonymous function in auth.controller.js
}

function destroyUserAuthSession(req){
    req.session.uid = null;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
};