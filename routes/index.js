const express = require("express");
const router = express.Router();
const middleware = require("../middleware");


// App state change routes
router.post("/changeRegistrationState", middleware.isLoggedIn, function(req, res) {
    middleware.registrationEnabled = !middleware.registrationEnabled;
    res.redirect("back");
});

//Landing route
router.get("/", function (req, res) {
    res.redirect("/projects");
});

//Contacts route
router.get("/contacts", function (req, res) {
    res.render("contacts");
});

module.exports = router;