import CanvasJson from './Canvas.json';
import Pixel from '@/models/Pixel';

export default class CanvasClient {
  constructor(props) {
    this.client = props.client;
    this.accounts = props.accounts;
  }

  static async getClient(web3Client) {
    const networkId = await web3Client.eth.net.getId();
    const accounts = await web3Client.eth.getAccounts();
    console.log({ networkId, accounts });
    const client = new web3Client.eth.Contract(CanvasJson.abi, CanvasJson.networks[networkId]?.address);
    return new CanvasClient({ client, accounts });
  }

  async getStartingWeiPrice() {
    try {
      return await this.client.methods.startingPriceWei().call();
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  }

  async buyPixel({ x, y, color }) {
    const value = await this.getStartingWeiPrice();
    try {
      await this.client.methods.buyPixel(x, y, color).send({
        from: this.accounts[0],
        value,
      });
    } catch (err) {
      console.error(err);
    }
  }
}