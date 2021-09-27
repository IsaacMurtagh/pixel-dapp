import web3Client from '../web3Client';
import CanvasJson from './Canvas.json';
import Pixel from '@/models/Pixel';
import VError from 'verror';

export default class CanvasClient {
  constructor(props) {
    this.client = props.client
  }

  static async getClient() {
    const networkId = await web3Client.eth.net.getId();
    const client = new web3Client.eth.Contract(CanvasJson.abi, CanvasJson.networks[networkId].address);
    return new CanvasClient({ client });
  }

  async getStartingWeiPrice() {
    try {
      return await this.client.methods.startingPriceWei().call();
    } catch (err) {
      throw VError(err);
    }
  }

  async getPixel({ x, y }) {
    try {
      const result = await this.client.methods.pixels(x, y).call();
      return new Pixel({
        ...result,
        x,
        y,
      });
    } catch (err) {
      throw VError(err);
    }
  }

  async buyPixel({ x, y, color }) {
    const value = await this.getStartingWeiPrice();
    try {
      const accounts = await web3Client.eth.getAccounts();
      await this.client.methods.buyPixel(x, y, color).send({
        from: accounts[0],
        value,
      });
    } catch (err) {
      throw VError(err);
    }
  }
}