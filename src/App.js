import React from 'react';
import Web3 from 'web3';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import "bulma/css/bulma.min.css";


function App() {
  const [web3APi, setWeb3API] = React.useState({
    provider: null,
    web3: null
  })
  const [accounts, setAccount] = React.useState(null)

  const connect = async (provider) => {
    await provider.request({ method: "eth_requestAccounts"})
  }

  React.useEffect(() => {
    const loadProvider = async () => {
      // debugger
      const provider = await detectEthereumProvider();

      if (provider) {
        // connect(provider)
        setWeb3API({
          web3: new Web3(provider),
          provider,
        })
      } else {
        console.error("Please install Metamask")
      }
      //with metamask we have an access to window.etherium & to window.web3
      //metamask injexts a global API into website
      //this API allows website to requset for users, acconts, readt data to blockchain/
      //sign messages ands trabsactions
    }
    loadProvider()

  }, [])

  React.useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3APi.web3?.eth?.getAccounts()
      setAccount(accounts[0])
    }

    web3APi.web3 && getAccounts()

  }, [web3APi.web3, accounts])

  // console.log(web3APi.web3)

  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
    }}>
    <div className="faucet-wrapper">
      <div className="faucet">
        <span> 
          <strong>Account:</strong>
        </span>
        <h4> 
          {accounts ? accounts : 
          
          <button className='button' onClick={() => connect(web3APi.provider)}> Connect</button>}
        </h4>
        <div className="balance-view is-size-2 mb-4">
          Current Balance: <strong>10</strong> ETH
        </div>
        {/* <button 
        onClick={async () => {
          console.log("What's up?")
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(accounts)
        }}
        className="btn mr-2">Enable Etherium</button> */}
        <button className="button is-link is-light mr-2">Donate</button>
        <button className="button is-primary is-light">Withdraw</button>
      </div>
    </div>

      
    </div>
  );
}

export default App;
