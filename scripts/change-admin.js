const hre = require('hardhat')

const old_admin = "<ADDR-OF-THE-CURRENT-ADMIN>"
const new_admin = "<ADDR-OF-THE-NEW-ADMIN>"  
const proxy_addr = "<ADDR-OF-THE-PROXY-CONTRACT>"
// ethers.utils.keccak256(ethers.utils.toUtf8Bytes("DEFAULT_ADMIN_ROLE")) 
const DEFAULT_ADMIN_ROLE = "0x1effbbff9c66c5e59634f24fe842750c60d18891155c32dd155fc2d661a4c86d"

async function main() {
	nnn_Factory = await ethers.getContractFactory("NNNToken")
	nnn_proxy = await nnn_Factory.attach(proxy_addr)

	//run a test mint to be sure everything works:
	//console.log("TEST-MINT:", await nnn_proxy.mint("<AN-ADDR-FOR-TEST-MINT>", "2000000000000000000"))

	//add new admin
	console.log("ADDING-NEW-ADMIN:", await nnn_proxy.grantRole(DEFAULT_ADMIN_ROLE, new_admin))

	//check if wallet has role
	console.log("CHECKING-NEW-ADMIN:", await nnn_proxy.hasRole(DEFAULT_ADMIN_ROLE, new_admin))

	//revoke role
	console.log("REVOKING-PREVIOUS-ADMIN:", await nnn_proxy.revokeRole(DEFAULT_ADMIN_ROLE, old_admin))


}

main()
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
