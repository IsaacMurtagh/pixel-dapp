# Pixel canvas app
An dapp which allows you to transact on the block chain the buy pixels on a canvas
visit `https://isaacmurtagh.github.io/pixel-dapp/` to use it

## Running in development
1. Open Ganache and run an RCP server on `http://127.0.0.1:8545`
2. Deploy the smart contract on the local block chain:
```bash
truffle migrate --network development
```
3. Run the dapp
```bash
cd pixel-dapp
yarn serve
```

## Running on the ropsten blockchain
1. add a secrets.json file with
```json
{
  "mnemonic": "your mnemoic which can be found in your metamask (or other wallet provider)",
  "projectId": "you ropsten project id, google how if you don't yet have one"
}
```
2. Deploy the smart contract on the ropsten network
```bash
truffle migrate --network ropsten
```
3. Deploy frontend
```
cd pixel-dapp
yarn deploy
```
5. visit `https://isaacmurtagh.github.io/pixel-dapp/`