import Web3 from 'web3';

const getWeb3 = async () => {
  // const provider = new Web3.providers.HttpProvider(
  //   "http://127.0.0.1:8545"
  // );
  // console.log("No web3 instance injected, using Local web3.");
  // return new Web3(provider);

  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log('Using modern dapp ethereum');
    return web3;
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    console.log("Injected web3 detected.");
    return window.web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:8545"
    );
    console.log("No web3 instance injected, using Local web3.");
    return new Web3(provider);
  }
}
export default getWeb3;
