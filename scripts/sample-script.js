// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { Contract } = require("ethers");
const { getUnnamedAccounts, ethers, waffle } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  [owner, alice, bob, chuck, ...others] = await ethers.getSigners();
  provider = ethers.provider;
  const MaticFaucet = await hre.ethers.getContractFactory("MaticFaucet");
  const maticFaucet = await MaticFaucet.deploy();
 
  await maticFaucet.deployed();
  console.log("Balance Before:", ethers.utils.formatEther(await ethers.provider.getBalance(owner.address)));
  console.log("MaticFaucet deployed to:", maticFaucet.address);
  await maticFaucet.donateToFaucet({ gasLimit: 400000, value: '1000000000000000000' })
  console.log("1 ETH transferred to:", maticFaucet.address);
  const balance = await ethers.provider.getBalance(maticFaucet.address);
  console.log(balance);
  console.log("Balance:", ethers.utils.formatEther(balance));
  tx = await maticFaucet.requestTokens();
  console.log("MaticFaucet requested tokens");
  console.log("Balance After:", ethers.utils.formatEther(await ethers.provider.getBalance(owner.address)));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
