const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("MaticFaucet", function () {
  before(async function () {
    MaticFaucet = await hre.ethers.getContractFactory("MaticFaucet");
  });

  beforeEach(async function () {
    maticFaucet = await MaticFaucet.deploy();
    await maticFaucet.deployed();
  });

  it("Should return the new contract balance after deployment", async function () {
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    expect(ethers.utils.formatEther(await ethers.provider.getBalance(maticFaucet.address))).to.equal("0.1");
  });

  it("Should return the new recipient balance after requesting tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    let ownerBal = await ethers.provider.getBalance(owner.address);
    const setReqTx = await maticFaucet.requestTokens();
    await setReqTx.wait();
    let ownerBal2 = await ethers.provider.getBalance(owner.address);
    await assert(ownerBal2.gte(ownerBal));
  });

  it("Revert on setPaused if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setPaused()
    ).to.be.revertedWith("revert");
  });

  it("Revert on setMaxAmount if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setMaxAmount(1)
    ).to.be.revertedWith("revert");
  });

  it("Revert on setTransferGas if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setTransferGas(1)
    ).to.be.revertedWith("revert");
  });

  it("Revert on setStipend if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setStipend(1)
    ).to.be.revertedWith("revert");
  });

  it("Revert on setTimeOut if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setTimeOut(1)
    ).to.be.revertedWith("revert");
  });

  it("Revert on setAmountallowed if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setAmountallowed(1)
    ).to.be.revertedWith("revert");
  });

  it("Revert on setOwner if not owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(
      maticFaucet.connect(addr1).setOwner("0xb27a9DDc593A396c62268f616Cf18278f7BA8101")
    ).to.be.revertedWith("revert");
  });

  it("No Revert on setPaused if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setPaused();
    let paused = await maticFaucet.viewPaused();
    await expect(
      paused
    ).to.equal(true);
  });

  it("No Revert on setMaxAmount if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setMaxAmount(1);
    let maxAmount = await maticFaucet.viewMaxAmount();
    await expect(
      maxAmount
    ).to.equal(1);
  });

  it("No Revert on setTransferGas if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setTransferGas(1);
    let transferGas = await maticFaucet.viewTransferGas();
    await expect(
      transferGas
    ).to.equal(1);
  });

  it("No Revert on setStipend if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setStipend(1);
    let stipend = await maticFaucet.viewStipend();
    await expect(
      stipend
    ).to.equal(1);
  });

  it("No Revert on setTimeOut if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setTimeOut(1)
    let timeOut = await maticFaucet.viewTimeOut();
    await expect(
      timeOut
    ).to.equal(1);
  });

  it("No Revert on setAmountallowed if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setAmountallowed(1);
    let amountallowed = await maticFaucet.viewAmountallowed();
    await expect(
      amountallowed
    ).to.equal(1);
  });

  it("No Revert on setOwner if owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setOwner("0xb27a9DDc593A396c62268f616Cf18278f7BA8101");
    let testowner = await maticFaucet.viewOwner();
    await expect(
      testowner
    ).to.equal("0xb27a9DDc593A396c62268f616Cf18278f7BA8101");
  });

  it("Owner can request no matter what balance", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr1.sendTransaction({ to: owner.address, value: ethers.utils.parseEther("0.1") });
    let ownerBal = await ethers.provider.getBalance(owner.address);
    const setReqTx = await maticFaucet.requestTokens();
    await setReqTx.wait();
    let ownerBal2 = await ethers.provider.getBalance(owner.address);
    //console.log(ownerBal.add(ethers.utils.parseEther("0.1")));
    await assert(ownerBal2.gte(ownerBal));
  });

  it("Balance too little in faucet to dispense", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '1000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(maticFaucet.requestTokens()).to.be.revertedWith("revert");
  });

  it("Anyone can't request from faucet if balance is too high", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await expect(maticFaucet.connect(addr1).requestTokens()).to.be.revertedWith("revert");
  });

  it("Anyone can request from faucet", async function () {
    const [owner, addr1] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr1.sendTransaction({ to: owner.address, value: ethers.utils.parseEther("1.9") });
    let addr1Bal = await ethers.provider.getBalance(addr1.address);
    const setReqTx = await maticFaucet.connect(addr1).requestTokens();
    await setReqTx.wait();
    
    let addr1Bal2 = await ethers.provider.getBalance(addr1.address);
    await assert(addr1Bal2.gte(addr1Bal));
  });

  it("Verifying 0.05 wallet balance limit", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr2.sendTransaction({ to: owner.address, value: ethers.utils.parseEther("1.95") });
    await expect(maticFaucet.connect(addr2).requestTokens()).to.be.revertedWith("revert");
  });

  it("Verifying deposits", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    let contractBal = await ethers.provider.getBalance(maticFaucet.address);
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    await setFundingTx.wait();
    let contractBal2 = await ethers.provider.getBalance(maticFaucet.address);
    await assert(contractBal2.gte(contractBal));
  });
  
  it("Pausing Faucet -- no one can request funds", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setPaused();
    await expect(maticFaucet.requestTokens()).to.be.revertedWith("revert");
    await expect(maticFaucet.connect(addr1).requestTokens()).to.be.revertedWith("revert");
  });

  it("Unpausing Faucet -- can withdraw again", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    let ownerBal = await ethers.provider.getBalance(owner.address);
    let addr1Bal = await ethers.provider.getBalance(addr1.address);
    await setFundingTx.wait();
    await maticFaucet.connect(owner).setPaused();
    await expect(maticFaucet.requestTokens()).to.be.revertedWith("revert");
    await expect(maticFaucet.connect(addr1).requestTokens()).to.be.revertedWith("revert");

    let ownerBal2 = await ethers.provider.getBalance(owner.address);
    let addr1Bal2 = await ethers.provider.getBalance(addr1.address);
    await maticFaucet.connect(owner).setPaused();
    await expect(ownerBal2.gte(ownerBal));
    await expect(addr1Bal2.gte(addr1Bal));
  });

  it("Verifying deposits work when paused", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    let contractBal = await ethers.provider.getBalance(maticFaucet.address);
    await maticFaucet.connect(owner).setPaused();
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    await setFundingTx.wait();
    let contractBal2 = await ethers.provider.getBalance(maticFaucet.address);
    await assert(contractBal2.gte(contractBal));
  });

  //write tests after adding gas limits, if added.  up to .0005 MATIC can be wasted on gas

  it("Verifying timelock blocks immediate additional contract calls", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr3.sendTransaction({ to: owner.address, value: ethers.utils.parseEther("2") });
    await maticFaucet.connect(addr3).requestTokens();
    await expect(maticFaucet.connect(addr3).requestTokens()).to.be.revertedWith("revert");
  });

  it("Verifying timelock blocks intermediate additional contract calls", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr3.sendTransaction({ to: owner.address, value: ethers.utils.parseEther(".02") });
    await maticFaucet.connect(addr3).requestTokens();
    await new Promise(r => setTimeout(r, 15000));
    await expect(maticFaucet.connect(addr3).requestTokens()).to.be.revertedWith("revert");
  });

  it("Verifying timelock releases after enough time", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    provider = ethers.provider;
    const setFundingTx = await maticFaucet.donateToFaucet({ gasLimit: 200000, value: '100000000000000000' });
    // wait until the transaction is mined
    await setFundingTx.wait();
    await addr3.sendTransaction({ to: owner.address, value: ethers.utils.parseEther(".02") });
    await maticFaucet.connect(addr3).requestTokens();
    await new Promise(r => setTimeout(r, 30000));
    let addr3Bal = await ethers.provider.getBalance(addr3.address);
    await maticFaucet.connect(addr3).requestTokens();
    let addr3Bal2 = await ethers.provider.getBalance(addr3.address);
    await assert(addr3Bal2.gte(addr3Bal));
  });

});
