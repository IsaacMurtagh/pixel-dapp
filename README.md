# Pixel canvas app
An appl

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
3. Build the dapp in production mode
```
cd pixel-dapp
yarn build
```
4. Create a subtree for the output dist files
```bash
git subtree push --prefix pixel-dapp/dist origin gh-pages
```