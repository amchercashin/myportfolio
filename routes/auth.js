const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const middleware = require("../middleware");

//===========
//AUTH ROUTES
//===========

router.get("/signup", middleware.isRegistrationEnabled, function (req, res) {
    res.render("signup");
});

router.post("/signup", middleware.isRegistrationEnabled, function (req, res) {
    const newUser = new User({username: req.body.username});
    // console.log(newUser + req.body.password)
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("signup", {error: err.message});
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/projects");
            });
        }
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/projects",
        failureRedirect: "/loginfailed"
    }), function (req, res) {

    });

router.get("/loginfailed", function (req, res) {
    req.flash("error", "Invalid username or password");
    res.redirect("login");
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/projects");
});

module.exports = router;