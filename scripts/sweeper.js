const ethers = require('ethers')


async function main() {
    let network = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    let provider = ethers.getDefaultProvider(network)

    let privKey = "SENDER-PRIVATE_KEY"
    let wallet = new ethers.Wallet(privKey, provider)

    let receiver = "RECEIVER-WALLET-ADDR"
    let amountInEther = '1.0'

    let tx = {
        gasPrice: 100000000000,
        to: receiver,
        value: ethers.utils.parseEther(amountInEther)
    }

    wallet.sendTransaction(tx)
    .then((txObj) => {
        console.log('txHash:', txObj.hash)
    })
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
