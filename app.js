//WEB SERVER IMPORT
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//DB
const mongoose = require("mongoose");

//AUTH IMPORT
const passport = require("passport");
const LocalStrategy = require("passport-local");

//DB MODELS IMPORT
const Project = require("./models/project");
const User = require("./models/user");

//DB SEEDS IMPORT
const seedProjectsToDB = require("./DBseeds/projects")
const seedAdminUserDB = require("./DBseeds/admin")
const seedTestUserDB = require("./DBseeds/test-user")

//ROUTES IMPORT
const indexRoutes = require("./routes/index");
const projectsRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");

//CUSTOM MIDDLEWARE IMPORT
const middleware = require("./middleware");


//Drop DB and Seed sample projects and/or users
seedProjectsToDB();
async function seedUsers(seedTestUser = false) {
    await seedAdminUserDB();
    if (seedTestUser) { seedTestUserDB(); }
}
seedUsers(true);



//APP SETUP
app.use(require("express-session")({
    secret: "Yes exactly the same command prompt…",
    resave: false,
    saveUninitialized: false
}));
app.use(require("connect-flash")());

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.registrationEnabled = middleware.registrationEnabled;
    next();
});

//db connect
// mongoose.connect("mongodb://localhost:27017/projects", { useNewUrlParser: true });
mongoose.connect("mongodb://myportfoliosite:myportfoliosite4mLab@ds145881.mlab.com:45881/myportfoliodb", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//ROUTES
app.use("/", indexRoutes);
app.use("/projects", projectsRoutes);
app.use("/", authRoutes);


app.listen(80, function () {
    console.log("Server has started!!!")
});