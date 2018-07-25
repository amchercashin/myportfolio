const Project = require("../models/project");
const marked = require("marked");
marked.setOptions({
    sanitize: false
});

const seedData = [
    {
        image: "https://skappal7.files.wordpress.com/2017/05/benford-law-image.jpg?w=1200",
        title: "Benford's law web app",
        description: "Illustrating Benford's law with R and Shiny.",
        mdBody: `In this section you can play with parameters of 4 different distributions (you can see their histograms at the right)

Every time you change something:

- A new sample of 10 000 numbers for that distribution is generated.
- 3 random arithmetic operations between this new and 3 other samples are performed elementwise with the result of some 10 000 numbers sequence.
- Histogram of only first digits of these numbers generated. And you can see how it conforms to Benford's law
`,
        type: "R"
    },
    {
        // image: "https://images2.imgbox.com/16/27/cHZz2LnN_o.png",
        // image: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4Ny8zMjgvb3JpZ2luYWwvZWFybGllc3QtdGVuLWNvbW1hbmRtZW50cy5qcGc=",
        image: "http://www.canbum.net/cdn/29/2009/202/blank-stone-tablet_70469.jpg",
        title: "Stone Tablets",
        description: "Notebooks on Ethereum blockchain. Carved in stone.",
        mdBody: `Available on mainnet and Ropsten testnet.

Make new tablet at tablet factory: new tablet will be deployed at a separate address (add tip if you like it ;-). You'll become the owner and the only scribe of this tablet.

You can add records to your tablet, like in a notebook. All records are stored in your own contract at Ethereum blockchain. There is no delete record option. So, everything will remain in the network while Ethereum exists. Remember, all records are public!

In the settings you can add and remove scribes of your tablet. Only tablet owner can do this.

Finally, you can transfer ownership of a tablet to another account.`,
        type: "Ethereum"
    },
    {
        image: "https://media.coindesk.com/uploads/2013/06/shutterstock_60475399.jpg",
        title: "Ethereum Cold-Brain Wallet",
        description: "Ethereum client side brain wallet that can be inferred on demand from several input parameters with transaction signing. Fully offline.",
        mdBody: `
These is also standalone version where all js libraries are embedded into single html. This could be more convinient when transferring and using at different devices. It could be used on an old smartphone with no internet access for an example.

You can try it [online](https://amchercashin.github.io/ETH_ColdBrainWallet/ColdBrainWallet-standalone.html), but for real personal use you should download it from [github repo](https://github.com/amchercashin/ETH_ColdBrainWallet/) and put on a offline device.

##### Goal
Find a sweet spot between safety from theft, safety from loss and ease of use.

##### Functionality
###### Offline Ethereum wallet (private key and address) generation as a function of 3 parameters (inspired by [original idea and code by Vitalik](https://www.reddit.com/r/ethereum/comments/535ovp/is_there_a_javascript_library_for_generating/d7q8hq7/?st=j7gaygm8&sh=435756ff)):
1. Hardness: integer value from [1000, 3000] range. This (with the function iteslf) ensures to take some coputational effort to get a key. Thus making it more time consuming to brute-force. 
2. Email. To protect from batch key picking attack, where keys generated for every popular password or phrase, then check for positive balance. 
3. Secret phrase. Actually a password. Should be long enough, not a actual meaningfull phrase in any language, not a "popular" password and not used anywhere else.

Function [keccak_256](https://en.wikipedia.org/wiki/SHA-3) implemented as recursive (but not a standardised SHA-3 version, but one that used inside Ethereum):

Step_(1) = keccak_256[ hardness * ( email + phrase ) ]

Step_(hardness) = keccak_256[ hardness * Step_(hardness-1) ],

Where "+", "*" are string operations: concatenation and string multiplication.

So in first step we concatenate _email_ and _phrase_, then concatenating this string with iteslf _hardness_ times to get one very long string. Then feed this string to keccak_256, which returns a hash: string of 64 hex characters always, despite the input.

Every next step we take the result from previous step (string of 64 hex chars, without leading "0x"), concatenate it with iteslf _hardness_ times again, and then feed again to keccak_256. Repeat this _hardness_ times.

Total steps = _hardness_ parameter.

It takes form 10s on my laptop to 1.5 minutes on a smartphone to get keypair or sign transaction.

###### Get address from any private key
Simply, infer Ethereum address from private key you can provide. Usefull if you have your own way to generate private key.

###### Sign offline transaction
This can be done with key, generated on the fly again with hardness, email, and secret phrase parameters. Or with raw private key instead.

Generated transaction code contains no private information and could be safly posted everywhere (if you are going to actually make it, surely). To _make_ a transaction you should broadcast this code to the blockchain (use MyEtherWallet.com or etherscain.io servoces for an example).

##### Dependencies: 
1. Browserifyed [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx) v1.3.3 for general Ethereum / crypto functions.
2. [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR Codes.
`,
        type: "Ethereum"
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
        type: "DataSciense"
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
        type: "Ethereum"
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