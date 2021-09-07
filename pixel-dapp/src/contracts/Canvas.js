import web3Client from '../web3Client';
import Canvas from './Canvas.json';

async function getCanvas() {
  const networkId = await web3Client.eth.net.getId();
  return new web3Client.eth.Contract(Canvas.abi, Canvas.networks[networkId].address);
}

export default {
  getCanvas
};