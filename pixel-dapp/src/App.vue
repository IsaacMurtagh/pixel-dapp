<template>
  <div class="container">
    <div v-if="clientError" class="errorMessage">
      <span v-html="clientError"/>
    </div>
    <h2>Pixel Dapp</h2>
    <div class="flex">
      <ColorPicker
        theme="light"
        :color="color"
        @changeColor="changeColor"
      />

      <div style="margin-left: 2rem;">
        <p>The smart contract this relies on is only deployed to the <b>Ropsten Test Network</b></p>
        <p>
          How to use this dapp:
          <ol>
            <li>Connect your wallet using a tool, such as MetaMask</li>
            <li>Select the Ropsten Test Network</li>
            <li>Choose a colour you would like your pixel to be</li>
            <li>Select one of the pixels which has not already been bought</li>
            <li>A transaction request will appear on your wallet, click confirm</li>
            <li>Admire the pixel you now own on the canvas.</li>
          </ol>
          Once you own a pixel on the canvas, no one else buy that pixel
        </p>
        <p>Github: <a href="https://github.com/IsaacMurtagh/pixel-dapp">https://github.com/IsaacMurtagh/pixel-dapp</a></p>
      </div>
    </div>

    <canvas-component 
      style="padding-top: 1rem"
      v-if="canvasLoaded"
      :canvas-matrix="canvasMatrix"
      :canvas-client="canvasClient"
      :selected-color="color"
    />
  </div>
</template>

<script>

import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import Canvas from './contracts/Canvas.js';
import CanvasComponent from './components/Canvas.vue';
import getWeb3 from './web3Client.js';
export default {
  name: 'App',

  components: {
    CanvasComponent,
    ColorPicker
  },

  data() {
    return {
      canvasContract: null,
      clientError: '',
      canvasLoaded: false,
      canvasMatrix: [],
      color: '#59c7f9'
    }
  },

  async created() {
    if (!this.checkEthereumEnabled()) {
      return;
    }
    const web3Client = await getWeb3();
    this.canvasClient = await Canvas.getClient(web3Client);
    await this.getCanvasPixels();
  },

  methods: {
    async getCanvasPixels() {
      const matrix = Array.apply(null, Array(20)).map(() => Array.apply(null, Array(20)));
      this.canvasMatrix = await Promise.all(matrix.map(async (row, y) => {
        return Promise.all(row.map(async (_, x) => {
          return (await this.canvasClient.getPixel({ x, y }));
        }));
      }));
      this.canvasLoaded = true;
    },

    checkEthereumEnabled() {
      if (!window.ethereum) {
        this.clientError = `
        An ethereum compatible browser is required, download MetaMask to use this.
        `
        return false;
      }
      return true;
    },

    changeColor(color) {
      this.color = color.hex
    },

    
  }
}
</script>
<style scoped>
.errorMessage {
  color: red;
  padding: 1rem;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  width: 100%;
}

.flex {
  display: flex;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
}
</style>