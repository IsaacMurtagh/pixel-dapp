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
    }
  }
};
