//import logo from './logo.svg';
import {useSate} from 'react';
import {ethers} from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';



const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
function App() { 
  const [greeting, setGreetingValue] = useSate()

  async function requestAccount(){
await window.ethereum.request({ method: 'eth_requestAccount'});
  }


  async function fetchGreeting(){
if (typeof window.ethereum !== 'undefined'){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
  try{
    const data = await contract.greet()
    console.log('data: ', data)
  } catch (err){
    console.log("Error: ", err)
    } 
  }
}
  async function setGreeting(){
if (!greeting) return
if (typeof window.ethreum !== 'undefined'){
await requestAccount()
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const contrat = new ethers.Contract(greeterAddress, Greeter.abi, signer)
const transaction = await Contract.setGreeting(greeting)
await transaction.wait()
fetchGreeting()

}
  }
  return (
    <div className="App">
      <header className="App-header">
       <button onClick={fetchGreeting}> Fetch Greeting</button>
       <button onClick={setGreeting}> Set Greeting</button>
        <input 
        onChange={e => setGreetingValue(e.target.vale)}
        placeholder = "set greeting"
        value = {greeting} 
        />
      </header> 
    </div>
  );
}

export default App;
