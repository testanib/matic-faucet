let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, get, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    args = []
    const MaticFaucet = await deploy('MaticFaucet', {
        from: deployer,
        args: args,
        log: true
    })
    log(`You have deployed a Faucet contract to ${MaticFaucet.address}`)
    const networkName = networkConfig[chainId]['name']
    log(`Verify with:\n npx hardhat verify --network ${networkName} ${MaticFaucet.address} ${args.toString().replace(/,/g, " ")}`)
    const MaticFaucetContract = await ethers.getContractFactory("MaticFaucet")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const maticFaucet = new ethers.Contract(MaticFaucet.address, MaticFaucetContract.interface, signer)
}

module.exports.tags = ['all', 'rfaucet']
