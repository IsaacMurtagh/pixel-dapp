const { mnemonic, projectId } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const path = require('path');
module.exports = {
  contracts_build_directory: path.join(__dirname, "pixel-dapp/src/contracts"),
  compilers: {
    solc: {
      version: "0.8.1",
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "5777"
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3,       // Ropsten's id
      gas: 6000000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 10000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  }
};