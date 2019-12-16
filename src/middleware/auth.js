let auth = {};

auth.isLoggedIn = function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect('/users/login');

};

auth.storeSession = function (req, res, next, user) {
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.user = `${user.firstName} ${user.lastName}`;
    req.session.save();
    return new Promise(((resolve, reject) => {
        if (req.session.user)
            return resolve('Session Stored');
        else
            return reject('Failed to save Session');
    }))
};

module.exports = auth;
