require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

require('dotenv').config();
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const MNEMONIC = process.env.MNEMONIC;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { 
      allowUnlimitedContractSize: true,
      accounts: {
        accountsBalance: "2050000000000000000"
      },
      loggingEnabled: false
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC
      }
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC
      }
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGON_API_KEY
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
},
  namedAccounts: {
    deployer:{
      default: 0
    }
  }
};
