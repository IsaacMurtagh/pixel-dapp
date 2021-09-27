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

import Canvas from './contracts/Canvas.js';
import CanvasComponent from './components/Canvas.vue';
export default {
  name: 'App',

  components: {
    CanvasComponent
  },

  data() {
    return {
      canvasContract: null,
      canvasLoaded: false,
      canvasMatrix: [],
    }
  },

  async created() {
    this.canvasClient = await Canvas.getClient();
  },

  methods: {
    async getStartingWeiPrice() {
      const cost = await this.canvasClient.getStartingWeiPrice();
      console.log(cost);
    },

    async getCanvasPixels() {
      const matrix = Array.apply(null, Array(20)).map(() => Array.apply(null, Array(20)));
      this.canvasMatrix = await Promise.all(matrix.map(async (row, y) => {
        return Promise.all(row.map(async (_, x) => {
          return (await this.canvasClient.getPixel({ x, y }));
        }));
      }));
      this.canvasLoaded = true;
    },
  }
}
</script>
