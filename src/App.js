import React, {useCallback} from 'react';
import Web3 from 'web3';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider'
import "bulma/css/bulma.min.css";
import {loadContractor} from "./utilitis/load-contract"

function App() {
  const [web3APi, setWeb3API] = React.useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
  })
  const [accounts, setAccount] = React.useState(null)
  const [balance, setBalance] = React.useState(null)

  const [reloadState, reload] = React.useState(false)

  const connect = async (provider) => {
    console.log("Connecting..")
    await provider.request({ method: "eth_requestAccounts"})
  }

  const reloadEffect = useCallback(() => reload(!reloadState), [reloadState])
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) =>  setAccount(accounts[0]))

    provider._jsonRpcConnection.events.on("notification", (payload) => {
      const {method} = payload
      if (method === "metamask_unlockStateChanged") {
        setAccount(null)
      }
    } )
  }


  React.useEffect(() => {
    const loadProvider = async () => {
      // debugger
      const provider = await detectEthereumProvider();

      // console.log(contract)1

      if (provider) {
        // connect(provider)
      const contract = await loadContractor("Faucet", provider)

        setAccountListener(provider)
        setWeb3API({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        })
      } else {
        setWeb3API((prev) => ({...prev, isProviderLoaded: true}))
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
      console.log(accounts)
      setAccount(accounts[0])
    }

    web3APi.web3  && getAccounts()

  }, [web3APi.web3, accounts])

  // console.log(web3APi.web3)

React.useEffect(() => {
  const getBalance = async () => {
    const {web3, contract} = web3APi
    let balance = await web3.eth.getBalance(contract.address)
    console.log("balance", balance)
    setBalance(web3.utils.fromWei(balance, "ether"))
   }
   web3APi.contract  && getBalance()

}, [web3APi, reloadState])

const Addfunds = useCallback (async () => {
  const {contract, web3} = web3APi
 accounts && await contract.addFunds({
    from: accounts,
    value: web3.utils.toWei("1", "ether"),
  })

  // window.location.reload();
  reloadEffect()
}, [web3APi, accounts,reloadEffect])

const WithdrawFunds = async () => {
  console.log("withrawing...")
  const {contract, web3} = web3APi
  const withdrawAmount = web3.utils.toWei("0.1", "ether")
 accounts && await contract.withdraw(withdrawAmount, {
    from: accounts,
  })
  // window.location.reload();
  reloadEffect()
}

  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
    }}>
    <div className="faucet-wrapper">
      {web3APi.isProviderLoaded ? 
      <div className="faucet">
        <span> 
          <strong>Account:</strong>
        </span>
        <h4> 
          {accounts ? accounts : !web3APi.provider ? 
          <div className='notification is-warning is-small is-size-8 is-rounded'>
            Wallet is not detected
            {` `}
            <a target="_blank" rel="noreferrer" href="https://docs.metamask.io">Install metamask</a>
          </div>
        :
          <button className='button' onClick={() => connect(web3APi.provider)}> Connect</button>}
        </h4>
        <div className="balance-view is-size-2 mb-4">
          Current Balance: <strong>{balance && balance}</strong> ETH
        </div>
        {/* <button 
        onClick={async () => {
          console.log("What's up?")
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(accounts)
        }}
        className="btn mr-2">Enable Etherium</button> */}
        <button className="button is-link is-light mr-2" 
        disabled={!accounts}
        onClick={Addfunds}>Donate 1eth</button>
        <button 
        disabled={!accounts}
        className="button is-primary is-light" onClick={WithdrawFunds}>Withdraw</button>
      </div>
        :
        <p>Loading...</p>
        }
    </div>

    </div>
  );
}

export default App;
// instance.addfunds({from: accounts[0], value: "20000000000000000000"})
