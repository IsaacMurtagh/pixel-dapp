<template>
  <div>
    <div v-if="clientError" class="errorMessage">
      <span v-html="clientError"/>
    </div>
    <div>
      <button @click="getCanvasPixels">
        get canvas pixels
      </button>
      <button @click="connectWallet">
        connect to app
      </button>
      <button @click="priceInWei">
        Price in Wei
      </button>
    </div>

    <canvas-component 
      v-if="canvasLoaded"
      :canvas-matrix="canvasMatrix"
      :canvas-client="canvasClient"
    />
  </div>
</template>

<script>

import Canvas from './contracts/Canvas.js';
import CanvasComponent from './components/Canvas.vue';
import getWeb3 from './web3Client.js';
export default {
  name: 'App',

  components: {
    CanvasComponent
  },

  data() {
    return {
      canvasContract: null,
      clientError: '',
      canvasLoaded: false,
      canvasMatrix: [],
      accounts: [],
    }
  },

  async created() {
    const web3Client = await getWeb3();
    this.accounts = await web3Client.eth.getAccounts();
    this.canvasClient = await Canvas.getClient(web3Client);
    await this.getCanvasPixels();
    console.log(this.accounts);
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

    async priceInWei() {
      const price = await this.canvasClient.getStartingWeiPrice();
      console.log(price);
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
}
</style>