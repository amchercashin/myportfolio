const prodEnv = (process.env.PROD === "true");
const middlewareObj = {};

middlewareObj.registrationEnabled = !prodEnv;

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isRegistrationEnabled = function(req, res, next) {
    if(middlewareObj.registrationEnabled) {
        return next();
    }
    res.redirect("back");
}

module.exports = middlewareObj;