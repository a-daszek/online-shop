function getSessionData(req){
    const sessionData = req.session.flashedData;

    req.session.flashedData = null;

    return sessionData;
}

function flashDataToSession(req, data, action){ // req - to access the session, data - data that should be flashed, action - a method that should be executed after data was stored on the session
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports ={
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}