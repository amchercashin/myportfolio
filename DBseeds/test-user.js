const User = require("../models/user");
const marked = require("marked");
marked.setOptions({
    sanitize: false
});

const seedUser = [{
    username: "test",
    salt: "43d7b432b887f3b95683c6dcf377439ecec5c092086ad13f14c2a99972a466c7",
    hash: "bedbaa1d9adad3931a4e1e383fa234901d1fc780e51b8415069867b82522a5eac103fe9a73ee262d0c09c7db5bdec3826def0b3a0d33a8fa3b8aa6be12ad86e75af721ecd76a9b4c11cffd326baaab69d6840a92ead68362b532cb2f88bdee0a2c8a34ba4b3790cd83c46de6c3c228bad0e83fd153068c60b04979171bb3b263a565fe27c2812a2bf7b9d926ca88bf214937b08b8b0594e5ff476c0c2159c2bf751d3f5e3a076485dd32f85fd7ae1132da08e45a42e3a8490ec77e6c978092a79c4f7ff7ac9cb1c164b723b7023bec5986665beb1611857a418e4129a7d37d6dc1eb310a6c31339fe9b18a748634732761833fe83426047b76356169401c1acf087073e908d4305cd6b0c0d05e8d06d946b0c16ebde35e735e7ddc8e5b941b45b722e0aea83970a1bf0dfad91980bab938653b28815618369f46b689e4f2e5b9f61586bd05adddcc317a1c71cbac6f18d0603669e160192a4e8648706672f646a2086bc80afd5353eb9bd5c01f0788a253470a496d5b1d7e49d5b8fafce31fd54d75968c61f13cd9a70223bc8b1108194064db0764059efae813c3e555b7eb95245430af3a1a0250adc0b8d5306188741aff0988963fbe6636a50afe7de75a72f6a2969b61df4047a69135e210ff1b4d10b03f25ddcc93e7e107d8729609d8223b078f6c10ed0320deb37dce5c65ebd9e0bbcd4646ae50f2b4cee6e0bc411104"
}]

function seedDB() {
    seedUser.forEach(function (seed) {           
        User.create(seed, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log("added a user");
                user.save();
            }
        });
    });
}

module.exports = seedDB;