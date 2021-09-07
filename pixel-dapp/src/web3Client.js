import Web3 from 'web3';

function getWeb3() {
  const provider = 'http://localhost:8545';
  return new Web3(provider);
}

export default getWeb3();