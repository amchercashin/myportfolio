const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose, {
    interval: 500,
    maxInterval: 36000000,
    limitAttempts: true

});

module.exports = mongoose.model("User", UserSchema);