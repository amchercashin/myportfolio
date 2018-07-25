const User = require("../models/user");
const marked = require("marked");
marked.setOptions({
    sanitize: false
});

const seedUser = [{
    username: "sashkets",
    salt: "f6fe6bf2fabc6ad9193cf523a7a2d710f065679caed1cd2803d246ee8ed7e6c1",
    hash: "c9a03149f5b83bcc7021b82ff6d8a2f809fecc8f902ff47212b6de665a4b6a86f3a9f8b25ba759f36fedca769361db1e4c8aaf5045d66f0c8d859911378a20bf151cfb2dd4ff904b95cab1c48141e78597d608542b6aff13a53aed61aba9709f33a14e027c4bb9eada7a70bc2e157f4d618dabac50dfd1f2eea663237a47850ee42d4cc8fcf48c805d275bac455eff01bebc93297e85f126a1889d69dca973e7452d7557722fd5d9d298c3e31b2493f67264f2fe9d9a067a6ee79f2a6d5ced2f57a0f065536aa77312f41b61bb035365a02a0757e233456189785257e5c04687a8bf4da6a50a073c83259ee0587b95d7fc2ae612419babc365c6e1c06a2daf71bc67e44ab944e79e4a952bdb0f63cad75b39e5bb220a8ab697c863e66af8ffb8da0c8013b5346b9cc013be2d0a98a8eef0d6c3234447bf63e8612b8f92305f0e819043009838c35f19f8bed01a44002c26247b0a75bbcdb2b206a45b17f1791383c4cf15045c8cdba0434c035628f6c1683011fba99b2be4f81f53fab8eb5340d9b1c9704b688b793c90bacc4abb8de7b61f465bd20010ebf8ca0e4dd185355237b21d6279aeb84ef9ac0e2345f9942b09d3512b88bd50a3f02142b99536c2cb7be2cdd7e47fdef49a025393eb4d848de0940edb0379de7a07f763190ec0385895cb49e53e9bb0fa4c688fcf28010d1be50fc2ae569eb5b0e210f55ab1531664"
}]

function seedDB() {
    //Remove all users
    return new Promise ( function(resolve, reject) {
        User.remove({}, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("Users removed!");
                seedUser.forEach(function (seed) {           
                    User.create(seed, function (err, user) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            console.log("added a user");
                            resolve(user.save());
                        }
                    });
                });
            }
        });
    });
}

module.exports = seedDB;

var resolveAfter2Seconds = function() {
    console.log("starting slow promise");
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(20);
        console.log("slow promise is done");
      }, 2000);
    });
  };