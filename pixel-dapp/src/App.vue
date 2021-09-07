<template>
  <div>
    <button @click="getStartingWeiPrice">
      get wei price
    </button>
  </div>
</template>

<script>

import Canvas from './contracts/Canvas.js';

export default {
  name: 'App',
  data() {
    return {
      canvas: null,
    }
  },

  async created() {
    this.canvas = await Canvas.getCanvas();

  },

  methods: {
    async getStartingWeiPrice() {
      const result = await this.canvas.methods.startingPriceWei().call();
      console.log(result);
    }
  }
}
</script>
