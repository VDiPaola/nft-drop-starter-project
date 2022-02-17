import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(()=>{
    console.log(
      'Public Key:',
      walletAddress
    );
  }, [walletAddress])

  const checkIsWalletConnected = async () => {
    try{
      const {solana} = window;
      if(solana && solana.isPhantom){
        console.log("phantom wallet found")
        const response = await solana.connect({onlyIfTrusted: true});
        setWalletAddress(response.publicKey.toString());
      }else{
        alert("Download the phantom wallet");
      }
    }catch(err){
      console.error("isWalletConnected: ", err);
    }
  }

  const connectWallet = async () => {
    try{
      const {solana} = window;
      if(solana){
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      }
    }catch(err){
      console.error("connectWallet: ", err);
    }
  }

  const renderSignInButton = () => (
        <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    )

  useEffect(()=>{
    const onLoad = async () => {
      checkIsWalletConnected();
    }
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderSignInButton()}
        </div>
      </div>
    </div>
  );
};

export default App;
