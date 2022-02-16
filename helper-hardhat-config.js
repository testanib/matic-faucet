const networkConfig = {
    default: {
        name: 'hardhat',
        fee: '100000000000000000'
    },
    31337: {
        name: 'localhost',
        fee: '100000000000000000'
    },
    137: {
        name: 'polygon',
        fee: '100000000000000'
    },
    80001: {
        name: 'mumbai',
        fee: '100000000000000',
    },
    4: {
        name: 'rinkeby',
        fee: '100000000000000000',
    },
    1: {
        name: 'mainnet',
        fundAmount: "0"
    },
    5: {
        name: 'goerli',
        fundAmount: "0"
    }
}

const developmentChains = ["hardhat", "localhost"]

const getNetworkIdFromName = async (networkIdName) => {
    for (const id in networkConfig) {
        if (networkConfig[id]['name'] == networkIdName) {
            return id
        }
    }
    return null
}


module.exports = {
    networkConfig,
    getNetworkIdFromName,
    developmentChains
}
