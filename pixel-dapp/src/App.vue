<template>
  <div>
    <button @click="getStartingWeiPrice">
      get wei price
    </button>
    <button @click="getCanvasPixels">
      get canvas pixels
    </button>

    <canvas-component 
      v-if="canvasLoaded"
      :canvas-matrix="canvasMatrix"
    />
  </div>
</template>

<script>

import CanvasContract from './contracts/Canvas.js';
import CanvasComponent from './components/Canvas.vue'

export default {
  name: 'App',

  components: {
    CanvasComponent
  },

  data() {
    return {
      canvasContract: null,
      canvasLoaded: false,
      canvasMatrix: null,
    }
  },

  async created() {
    this.canvasContract = await CanvasContract.getCanvas();

  },

  methods: {
    async getStartingWeiPrice() {
      const result = await this.canvasContract.methods.startingPriceWei().call();
      console.log(result);
    },

    async getCanvasPixels() {
      const matrix = Array.apply(null, Array(20)).map(() => Array.apply(null, Array(20)));
      const result = await Promise.all(matrix.map(async (row, y) => {
        return Promise.all(row.map(async (_, x) => {
          return (await this.canvasContract.methods.pixels(x, y).call()).color;
        }));
      }));
      this.canvasMatrix = result;
      this.canvasLoaded = true;
    },
  }
}
</script>
