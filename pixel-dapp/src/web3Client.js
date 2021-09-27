import Web3 from 'web3';

function getWeb3() {
  const provider = process.env.VUE_APP_URL;
  return new Web3(provider);
}

export default getWeb3();