import { useEffect, useState  } from 'react';
import './App.css';
import contract from './contracts/MaticFaucet.json';
import { ethers } from 'ethers';


const contractAddress = "0x939B9D0F384f4C5a217f25363D8746cAd18Bc67b";
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const reqHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const faucetContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let txn = await faucetContract.requestTokens({gasLimit: 85000});

        console.log("Mining... please wait");
        await txn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const reqHandlerButton = () => {
    return (
      <button onClick={reqHandler} className='cta-button mint-nft-button'>
        Request Matic
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Matic Faucet</h1>
      <div>
        {currentAccount ? reqHandlerButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;