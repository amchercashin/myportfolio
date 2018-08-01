const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const middleware = require("../middleware");
const marked = require("marked");
marked.setOptions({
    sanitize: true
});
// PROJECTS RESTFULL ROUTES

// INDEX route
router.get("/", function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        else {
            res.render("index", { projects: projects,
                                  prodEnv: (process.env.PROD === "true")
                                }
                        );
        }
    })

});

// NEW route 
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("new.ejs");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function (req, res) {
    //get data from form and add to DB
    //redirect back to projects
    marked(req.body.project.mdBody, function (err, htmlString) {
        if (err) {
            console.log(err);
        }
        else {
            req.body.project.htmlBody = htmlString;
            Project.create(req.body.project, function (err, project) {
                if (err) {
                    console.log(err);
                    res.redirect("/projects");
                }
                else {
                    res.redirect("/projects");
                }
            });
        }
    });
});

// SHOW route
router.get("/:id", function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) {
            console.log(err);
            res.redirect("/projects");
        }
        else {
            res.render("show", { project: project });
        }
    });
});

// EDIT route
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) {
            console.log(err);
            res.redirect("/projects");
        }
        else {
            res.render("edit", { project: project });
        }
    });
});

// UPDATE route
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    marked(req.body.project.mdBody, function (err, htmlString) {
        if (err) {
            console.log(err);
        }
        else {
            req.body.project.htmlBody = htmlString;
            Project.findByIdAndUpdate(req.params.id, req.body.project, function (err, project) {
                if (err) {
                    console.log(err);
                    // res.redirect("/projects");
                }
                else {
                    res.redirect("/projects/" + req.params.id);
                }
            });
        }
    });
});

// DELETE route
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    Project.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/projects");
        }
        else {
            res.redirect("/projects");
        }
    });
});

module.exports = router;