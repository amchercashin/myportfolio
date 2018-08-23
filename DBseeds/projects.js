const Project = require("../models/project");
const marked = require("marked");
marked.setOptions({
    sanitize: false
});

const seedData = [
    {
        image: "https://trainingprdcdnendpoint.azureedge.net/Images/nodejs-520.jpg",
        title: "This site!",
        description: "My Portfolio web-site",
        mdBody: `Check demo: [https://acherkashin-myportfolio-demo.herokuapp.com](https://acherkashin-myportfolio-demo.herokuapp.com).\r\n\r\nGithub: [https://github.com/amchercashin/myportfolio](https://github.com/amchercashin/myportfolio).\r\n\r\nThe stack: Bootsrtap 4, Node+Express, MongoDB, Passport.js for authentication.\r\n\r\nProjects routing follow RESTful routes.\r\n\r\nApp has been
deployed to [Heroku](https://heroku.com) and DBs to [MLab](https://mlab.com).
`,
        type: "web-dev",
        created: new Date("2018-08-05")
    },
    {
        image: "https://skappal7.files.wordpress.com/2017/05/benford-law-image.jpg?w=1200",
        title: "Benford's law web app",
        description: "Illustrating Benford's law with R and Shiny.",
        mdBody: `
Made with [R](https://www.r-project.org/), [Rstudio](https://www.rstudio.com/), [ggplot2](https://ggplot2.tidyverse.org/) and [Shiny](https://www.rstudio.com/products/shiny/). I made this during Data Science course with R at Johns Hopkins University.

About Benford's law: [https://rpubs.com/DonYagon/Benford](https://rpubs.com/DonYagon/Benford).

Web-app: [https://acherkashin.shinyapps.io/Benford](https://acherkashin.shinyapps.io/Benford).

Actually with aforementioned soft that was rather small and easy project.
`,
        type: "R",
        created: new Date("2018-08-02")
    },
    {
        // image: "https://images2.imgbox.com/16/27/cHZz2LnN_o.png",
        // image: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4Ny8zMjgvb3JpZ2luYWwvZWFybGllc3QtdGVuLWNvbW1hbmRtZW50cy5qcGc=",
        image: "http://www.canbum.net/cdn/29/2009/202/blank-stone-tablet-template_70470.jpg",
        title: "Ethereum: Stone Tablets",
        description: "Notes service on Ethereum blockchain with no delete option",
        mdBody: `
[https://amchercashin.github.io/stone_tablets/](https://amchercashin.github.io/stone_tablets/)
Trying myself is simple Solidity and blockchain development. You need [Metamask](https://metamask.io/) to use it. Available on Mainnet and Ropsten testnet.

[Ethereum](https://en.wikipedia.org/wiki/Ethereum) is a "cryptocurrency". But more then that: it is a Virtual World Computer (called EVM - Ethereum Virtual Machine) that can compute any program and store data. The link above is an example of such a program that usually called "smartcontract" in blockchain world. World Computer - because EVM runs in parallel on thousands of nodes spread around the world. 

While computes, EVM consumes ETH (Ethereum coin) as a payment. This both motivates people to run nodes and distributes EVM resources appropriately to the desire and ability to pay. Solidity - one of programming languages for EVM.

Of course being world computer EVM is very: slow, expensive. But it design gives another benefits. In short: EVM is open and it can't be stoped. The balance of EVM week and strong parts defines it'se use. For now it justified only for the most critial applications. Critical usually means money: like  value transfer/store or records of rights. Upcoming scaling solution will make it appropriate for more use cases.

PS. Please keep in mind: vade it prior formal web-dev education.
`,
        type: "Ethereum",
        created: new Date("2018-08-03")
    },
    {
        image: "https://media.coindesk.com/uploads/2013/06/shutterstock_60475399.jpg",
        title: "Ethereum Cold-Brain Wallet",
        description: "Ethereum client side brain wallet...",
        mdBody: `
... that can be inferred on demand from several input parameters with transaction signing. Fully offline.\r\n\r\nYou can try it [online](https://amchercashin.github.io/ETH_ColdBrainWallet/ColdBrainWallet-standalone.html), but for
real personal use you should download it from [github repo](https://github.com/amchercashin/ETH_ColdBrainWallet/) and put on a offline device.\r\n\r\n##### Goal\r\nFind a sweet spot between safety from theft, safety from loss and ease of use.\r\n\r\n##### Functionality\r\n###### Offline Ethereum wallet (private key and address) generation as a function of 3 parameters (inspired by [original idea and code by Vitalik](https://www.reddit.com/r/ethereum/comments/535ovp/is_there_a_javascript_library_for_generating/d7q8hq7/?st=j7gaygm8&sh=435756ff)):\r\n1. Hardness: integer value from [1000, 3000] range. This (with the function iteslf) ensures to take some coputational effort to get a key. Thus making it more time consuming to brute-force. \r\n2. Email. To protect from batch key picking attack, where keys generated for every popular password or phrase, then check for positive balance. \r\n3. Secret phrase. Actually a password. Should be long enough, not a actual meaningfull phrase in any language, not a \"popular\" password and not used anywhere else.\r\n\r\nFunction [keccak_256](https://en.wikipedia.org/wiki/SHA-3) implemented as recursive (but not a standardised SHA-3 version, but one that used inside Ethereum):\r\n\r\nStep_(1) = keccak_256[ hardness * ( email + phrase ) ]\r\n\r\nStep_(hardness) = keccak_256[ hardness * Step_(hardness-1) ],\r\n\r\nWhere \"+\", \"*\" are string operations: concatenation and string multiplication.\r\n\r\nSo in first step we concatenate _email_ and _phrase_, then concatenating this string with iteslf _hardness_ times to get one very long string. Then feed this string to keccak_256, which returns a hash: string of 64 hex characters always, despite the input.\r\n\r\nEvery next step we take the result
from previous step (string of 64 hex chars, without leading \"0x\"), concatenate it with iteslf _hardness_ times again, and then feed again to keccak_256. Repeat this _hardness_ times.\r\n\r\nTotal steps = _hardness_ parameter.\r\n\r\nIt takes form 10s on my laptop to 1.5 minutes on a smartphone to get keypair or sign transaction.\r\n\r\n###### Get
address from any private key\r\nSimply, infer Ethereum address from private key you can provide. Usefull if you have
your own way to generate private key.\r\n\r\n###### Sign offline transaction\r\nThis can be done with key, generated
on the fly again with hardness, email, and secret phrase parameters. Or with raw private key instead.\r\n\r\nGenerated transaction code contains no private information and could be safly posted everywhere (if you are going to actually make it, surely). To _make_ a transaction you should broadcast this code to the blockchain (use MyEtherWallet.com or etherscain.io servoces for an example).\r\n\r\n##### PS\r\nThese is also standalone version where all js libraries are embedded into single html. This could be more convinient when transferring and using at different devices. It could be used on an old smartphone with no internet access for an example.\r\n\r\n##### Dependencies: \r\n1. Browserifyed [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx) v1.3.3 for general Ethereum / crypto functions.\r\n2. [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR Codes.\r\n

PPS. Please keep in mind: vade it prior formal web-dev education.
`,
        type: "Ethereum",
        created: new Date("2018-08-04")
    },
    {
        image: "http://www.krastsvetmet.ru/images/catalog/tech/catalyst-systems-1.jpg",
        title: "AK-72 Catalyst Efficiency Analysis",
        description: "NO2 Catalyst Efficiency Analysis in Nitric Acid production",
        mdBody: `
NO2 Catalyst Efficiency Analysis in Nitric Acid production

NO2 Catalyst Efficiency Analysis in Nitric Acid production

NO2 Catalyst Efficiency Analysis in Nitric Acid production

NO2 Catalyst Efficiency Analysis in Nitric Acid production

NO2 Catalyst Efficiency Analysis in Nitric Acid production

NO2 Catalyst Efficiency Analysis in Nitric Acid production                              
`,
        type: "DataSciense",
        created: new Date("2018-08-01")
    },
    {
        image: "https://images2.imgbox.com/16/b3/ytFRE7eD_o.png",
        title: "Cryptokitties",
        description: "Investments in digital scarcity items",
        mdBody: `
CryptoKitties is one of the world’s first games to be built on blockchain technology—the same breakthrough that makes things like Bitcoin 
and Ethereum possible. Bitcoin and ether are cryptocurrencies but CryptoKitties are cryptocollectibles. 
You can buy, sell, or trade your CryptoKitty like it was a traditional collectible, secure in the knowledge that blockchain will track ownership securely.                              
        `,
        type: "Ethereum",
        created: new Date("2018-07-31")
    }
]

function seedDB() {
    //Remove all projects
    Project.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Projects removed!");

        //add a few projects
        seedData.forEach(function (seed) {
            marked(seed.mdBody, function (err, htmlString) {
                if (err) {
                    console.log(err);
                }
                else {
                    seed.htmlBody = htmlString;
                    Project.create(seed, function (err, project) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("added a project");
                            project.save();
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;