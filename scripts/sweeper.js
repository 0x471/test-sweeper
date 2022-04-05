var fs = require('fs')
var Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3')
var Common = require('ethereumjs-common').default;

var web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'))
var BSC_FORK = Common.forCustomChain(
    'mainnet',
    {
        name: 'bnb',
        networkId: 97,
        chainId: 97,
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545'
    },
    'istanbul',
);

var originalAmountToSend = '0.01';
var amountToSend = web3.utils.toWei(originalAmountToSend, 'ether');
var sourceAccount = JSON.parse(fs.readFileSync('FROM.json', 'utf-8'));
var targetAccount = JSON.parse(fs.readFileSync('TO.json', 'utf-8'));
console.log(sourceAccount, targetAccount)

async function sendBNB(fromAddress, toAddress, pKey, amountToSend) {
    console.log("send bnb function executed")
    var privateKey = Buffer.from(pKey.slice(2), 'hex');
    var count = await web3.eth.getTransactionCount(fromAddress);

    var rawTransaction = {
        "from": fromAddress,
        "gasPrice": web3.utils.toHex(63000000000),//?
        "gasLimit": web3.utils.toHex(300000), //?
        "to": toAddress,
        "value": web3.utils.toHex(amountToSend),
        "nonce": web3.utils.toHex(count)
    };

    var transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
    transaction.sign(privateKey);

    var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
    console.log(result);
    return result;
}

sendBNB(sourceAccount.address, targetAccount.address, sourceAccount.privateKey, amountToSend)
    .then(() => process.exit(0))
    .catch((error) => {        
        console.error(error);
        process.exit(1);
    })

